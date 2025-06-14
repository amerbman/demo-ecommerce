// src/app/api/addresses/route.ts
import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ addresses: [] }, { status: 200 })
  }

  const { data, error } = await supabase
    .from("addresses")
    .select("id, full_name, email, street, city, postal_code, country")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("❌ Address fetch failed:", error)
    return NextResponse.json({ addresses: [], error: error.message }, { status: 500 })
  }

  return NextResponse.json({ addresses: data || [] }, { status: 200 })
}

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const body = await req.json()
  const { full_name, email, street, city, postal_code, country } = body

  if (!full_name || !email || !street || !city || !postal_code || !country) {
    return NextResponse.json({ error: "Missing required address fields" }, { status: 400 })
  }

  const { count, error: countErr } = await supabase
    .from("addresses")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)

  if (countErr) {
    console.error("❌ Address count check failed:", countErr)
    return NextResponse.json({ error: "Could not verify address limit" }, { status: 500 })
  }

  if ((count ?? 0) >= 3) {
    return NextResponse.json({ error: "Address limit reached (max 3)" }, { status: 403 })
  }

  const { data: newAddress, error } = await supabase
    .from("addresses")
    .insert({ full_name, email, street, city, postal_code, country, user_id: user.id })
    .select("*")
    .single()

  if (error) {
    console.error("❌ Address insert error:", error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ address: newAddress }, { status: 201 })
}

export async function PATCH(req: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const { id, ...updates } = await req.json()

  if (!id) {
    return NextResponse.json({ error: "Missing address ID" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("addresses")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select("*")
    .single()

  if (error) {
    console.error("❌ Address update failed:", error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ address: data }, { status: 200 })
}

export async function DELETE(req: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const { id } = await req.json()

  if (!id) {
    return NextResponse.json({ error: "Missing address ID" }, { status: 400 })
  }

  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) {
    console.error("❌ Address delete failed:", error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}

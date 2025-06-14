// src/app/api/orders/route.ts
import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

interface ShippingInfo {
  full_name: string
  email: string
  street: string
  city: string
  postal_code: string
  country: string
}

interface OrderItem {
  part_number: string
  quantity: number
  unit_price: number
}

interface OrderRequestBody {
  shipping: ShippingInfo
  items: OrderItem[]
  total: number
}

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  // Parse and validate request body
  const body: OrderRequestBody = await req.json()
  const { shipping, items, total } = body

  // Authenticate user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
    // Resolve or insert address
    let addressId: string
    const { data: existing, error: lookupErr } = await supabase
      .from("addresses")
      .select("id")
      .match({
        user_id: user.id,
        street: shipping.street,
        city: shipping.city,
        postal_code: shipping.postal_code,
        country: shipping.country,
      })
      .maybeSingle()
    if (lookupErr) throw lookupErr

    if (existing?.id) {
      addressId = existing.id
    } else {
      const { data: addr, error: addrErr } = await supabase
        .from("addresses")
        .insert({
          full_name: shipping.full_name,
          email: shipping.email,
          street: shipping.street,
          city: shipping.city,
          postal_code: shipping.postal_code,
          country: shipping.country,
          user_id: user.id,
        })
        .select("id")
        .single()
      if (addrErr || !addr) throw addrErr || new Error("Address insert failed")
      addressId = addr.id
    }

    // Insert order
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({ user_id: user.id, address_id: addressId, total })
      .select("id")
      .single()
    if (orderErr || !order) throw orderErr || new Error("Order insert failed")

    // Lookup product UUIDs by SKU
    const skus = items.map((it) => it.part_number)
    const { data: prods, error: prodErr } = await supabase
      .from("products")
      .select("id, part_number")
      .in("part_number", skus)
    if (prodErr || !prods) throw prodErr || new Error("Product lookup failed")
    const skuToUUID = Object.fromEntries(
      prods.map((p) => [p.part_number, p.id])
    )

    // Build and insert line items
    const lineItems = items.map((it) => ({
      order_id: order.id,
      product_id: skuToUUID[it.part_number],
      part_number: it.part_number,
      quantity: it.quantity,
      unit_price: it.unit_price,
    }))
    const { error: itemsErr } = await supabase
      .from("order_items")
      .insert(lineItems)
    if (itemsErr) throw itemsErr

    // Success
    return NextResponse.json({ orderId: order.id }, { status: 201 })
  } catch (error: unknown) {
    console.error("❌ /api/orders error:", error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

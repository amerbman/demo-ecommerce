// src/app/api/orders/route.ts
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { shipping, items, total } = await req.json();

    // 1) Authenticate
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 2) Look up an existing address for this user + exact same fields
    const { data: existing, error: lookupErr } = await supabase
      .from("addresses")
      .select("id")
      .match({
        user_id:     user.id,
        street:      shipping.address,
        city:        shipping.city,
        postal_code: shipping.postalCode,
        country:     shipping.country,
      })
      .maybeSingle();

    if (lookupErr) {
      console.error("Address lookup error:", lookupErr);
      return NextResponse.json({ error: lookupErr.message }, { status: 500 });
    }

    let addressId: string;
    if (existing?.id) {
      // reuse existing
      addressId = existing.id;
    } else {
      // 3) insert new address
      const { data: addr, error: addrErr } = await supabase
        .from("addresses")
        .insert({
          full_name:   shipping.fullName,
          email:       shipping.email,
          street:      shipping.address,
          city:        shipping.city,
          postal_code: shipping.postalCode,
          country:     shipping.country,
          user_id:     user.id,
        })
        .select("id")
        .single();

      if (addrErr || !addr) {
        console.error("Address insert failed:", addrErr);
        return NextResponse.json({ error: addrErr?.message }, { status: 500 });
      }
      addressId = addr.id;
    }

    // 4) insert the order row
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        user_id:    user.id,
        address_id: addressId,
        total,
      })
      .select("id")
      .single();

    if (orderErr || !order) {
      console.error("Order insert failed:", orderErr);
      return NextResponse.json({ error: orderErr?.message }, { status: 500 });
    }

    // 5) build and insert line items
    const lineItems = items.map((it: any) => ({
      order_id:   order.id,
      product_id: it.id ?? it.part_number,
      part_number: it.part_number,
      quantity:   it.quantity,
      unit_price: it.unit_price,
    }));

    const { error: itemsErr } = await supabase
      .from("order_items")
      .insert(lineItems);

    if (itemsErr) {
      console.error("Order items insert failed:", itemsErr);
      return NextResponse.json({ error: itemsErr.message }, { status: 500 });
    }

    // 6) All done
    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch (err: any) {
    console.error("Unexpected error in /api/orders:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

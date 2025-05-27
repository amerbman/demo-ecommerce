// File: src/app/api/orders/route.ts
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

    // 2) Resolve or Insert Address
    // (same as before, using shipping.street, etc.)
    let addressId: string;
    {
      // Try lookup
      const { data: existing, error: lookupErr } = await supabase
        .from("addresses")
        .select("id")
        .match({
          user_id:     user.id,
          street:      shipping.street,
          city:        shipping.city,
          postal_code: shipping.postal_code,
          country:     shipping.country,
        })
        .maybeSingle();
      if (lookupErr) throw lookupErr;

      if (existing?.id) {
        addressId = existing.id;
      } else {
        const { data: addr, error: addrErr } = await supabase
          .from("addresses")
          .insert({
            full_name:   shipping.full_name,
            email:       shipping.email,
            street:      shipping.street,
            city:        shipping.city,
            postal_code: shipping.postal_code,
            country:     shipping.country,
            user_id:     user.id,
          })
          .select("id")
          .single();
        if (addrErr || !addr) throw addrErr || new Error("Address insert failed");
        addressId = addr.id;
      }
    }

    // 3) Insert Order
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .insert({
        user_id:    user.id,
        address_id: addressId,
        total,
      })
      .select("id")
      .single();
    if (orderErr || !order) throw orderErr || new Error("Order insert failed");

    // 4) Lookup product UUIDs by SKU
    const skus = items.map((it: any) => it.part_number);
    const { data: prods, error: prodErr } = await supabase
      .from("products")
      .select("id, part_number")
      .in("part_number", skus);
    if (prodErr) throw prodErr;
    // Map SKU → UUID
    const skuToUUID = Object.fromEntries(prods.map(p => [p.part_number, p.id]));

    // 5) Build line items array with real UUIDs
    const lineItems = items.map((it: any) => ({
      order_id:    order.id,
      product_id:  skuToUUID[it.part_number],
      part_number: it.part_number,
      quantity:    it.quantity,
      unit_price:  it.unit_price,
    }));

    // 6) Insert line items
    const { error: itemsErr } = await supabase
      .from("order_items")
      .insert(lineItems);
    if (itemsErr) throw itemsErr;

    // 7) Success
    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch (err: any) {
    console.error("❌ /api/orders error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

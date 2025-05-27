// File: src/app/[locale]/checkout/page.tsx
'use client'

import React, { useState } from "react"
import { useCart } from "@/context/CartContext"
import { useRouter, useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import AddressBook, { Address } from "@/components/AddressBook"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, closeCart } = useCart()
  const { locale } = useParams() as { locale?: string }
  const t = useTranslations()
  const router = useRouter()
  const isRTL = locale === "ar"

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAddress) {
      setError(t("Checkout.noAddressSelected"))
      return
    }
    setSubmitting(true)
    setError(null)

    try {
      const payload = {
        shipping: selectedAddress,
        items: items.map((it) => ({
          id: it.id,
          part_number: it.id,
          quantity: it.quantity,
          unit_price: it.price,
        })),
        total: totalPrice,
      }

      // Use absolute API path (no locale prefix) to hit the Route Handler
      const orderRes = await fetch(`/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })
      const data = await orderRes.json()
      if (!orderRes.ok) throw new Error(data.error || "Order failed")

      closeCart()
      clearCart()
      router.push(`/${locale}/order-confirmation?ref=${data.orderId}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className={`container mx-auto p-8 space-y-6 ${isRTL ? "text-right" : ""}`}
    >
      <h1 className="text-2xl font-bold">{t("Checkout.title")}</h1>

      {error && <p className="text-red-600">{error}</p>}

      {/* Address selection and management */}
      <AddressBook
        checkoutMode
        onSelect={(addr) => setSelectedAddress(addr ?? null)}
      />

      {/* Place Order */}
      <form onSubmit={handleSubmit} className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {submitting ? t("Checkout.processing") : t("Checkout.placeOrder")}
        </button>
      </form>
    </main>
  )
}
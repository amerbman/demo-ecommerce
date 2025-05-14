// src/app/[locale]/checkout/page.tsx
"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { locale } = useParams() as { locale?: string };
  const t = useTranslations("Checkout");
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      // TODO: integrate payment via Stripe here
      // For now, simulate order creation
      await fetch(`/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shipping: form, total: totalPrice }),
      });
      clearCart();
      router.push(`/${locale}/orders`);
    } catch (err: any) {
      setError(err.message || t("errorOccurred"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        {error && <p className="text-red-600">{error}</p>}
        <div>
          <label className="block mb-1">{t("fullName")}</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">{t("email")}</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1">{t("address")}</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">{t("city")}</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">{t("postalCode")}</label>
            <input
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">{t("country")}</label>
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div className="border-t pt-4">
          <p className="text-lg font-semibold mb-2">
            {t("orderTotal")} ${totalPrice.toFixed(2)}
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {submitting ? t("processing") : t("placeOrder")}
          </button>
        </div>
      </form>
    </main>
  );
}

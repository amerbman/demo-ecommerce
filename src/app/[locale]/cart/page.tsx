// src/app/[locale]/cart/page.tsx
"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, updateItemQuantity, removeItem, totalPrice, clearCart } = useCart();
  const { locale } = useParams() as { locale?: string };
  const t = useTranslations("Cart");
  const router = useRouter();

  const handleCheckout = () => {
    // TODO: navigate to checkout form
    router.push(`/${locale}/checkout`);
  };

  if (items.length === 0) {
    return (
      <main className="container mx-auto p-8 text-center">
        <p className="text-lg text-gray-600">{t("empty")}</p>
        <Link href={`/${locale}/shop`} className="text-red-600 hover:underline">
          {t("continueShopping")}
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>

      <ul className="space-y-4">
        {items.map(item => (
          <li key={item.id} className="flex items-center space-x-4">
            {item.image && (
              <div className="w-20 h-20 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <h2 className="font-medium">{item.name}</h2>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
              <input
                type="number"
                min={0}
                value={item.quantity}
                onChange={e => updateItemQuantity(item.id, Number(e.target.value))}
                className="w-16 border rounded p-1 mt-1"
              />
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:underline"
            >
              {t("remove")}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">
          {t("total")} ${totalPrice.toFixed(2)}
        </p>
        <div className="space-x-2">
          <button
            onClick={clearCart}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            {t("clearCart")}
          </button>
          <button
            onClick={handleCheckout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {t("checkout")}
          </button>
        </div>
      </div>
    </main>
  );
}

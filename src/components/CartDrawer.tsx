"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function CartDrawer() {
  const t = useTranslations("CartDrawer");
  const { items, totalPrice, isOpen, closeCart, removeItem } = useCart();
  const router = useRouter();
  const pathname = usePathname() || "";
  const locale = pathname.split("/")[1] || "en";

  
  if (!isOpen) return null;

  const handleBackdropClick = () => closeCart();
  const handlePanelClick = (e: React.MouseEvent) => e.stopPropagation();

  const handleCheckout = () => {
    closeCart();
    router.push(`/${locale}/cart`);
  };

  return (
    <div className="fixed inset-0 z-50" onClick={handleBackdropClick}>
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div
        className="absolute top-0 bottom-0 right-0 w-full max-w-md bg-white h-full flex flex-col shadow-lg z-10"
        onClick={handlePanelClick}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">{t("title")}</h2>
          <button onClick={closeCart} className="text-gray-600 hover:text-gray-800">
            ✕
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">{t("empty")}</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="ml-4 flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p>
                    {t("quantity", { count: item.quantity })}
                  </p>
                  <p className="font-semibold">
                    {(item.price * item.quantity).toFixed(2)} SAR
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(item.id);
                  }}
                  className="text-red-500 ml-2"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-medium">{t("total")}</span>
            <span className="font-bold">{totalPrice.toFixed(2)} SAR</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            {t("checkout")}
          </button>
        </div>
      </div>
    </div>
  );
}
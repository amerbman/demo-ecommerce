// src/components/ProductCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCart } from "@/context/CartContext";

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  description,
}: ProductCardProps) {
  const t = useTranslations("productCard");
  const { addItem } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
      // Prevent the click from bubbling up into the surrounding Link
      e.preventDefault();
        e.stopPropagation();
        addItem({ id, name, price, image }, 1);
      };
    

  return (
    <div className="w-full max-w-xs mx-auto border rounded-md overflow-hidden shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
      <div className="relative w-full h-60">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      <div className="p-2 flex flex-col">
        <h3 className="font-medium mb-1 text-center text-sm">{name}</h3>

        {description && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">
            {description}
          </p>
        )}

        <p className="text-lg font-semibold text-center mb-2">
          ${price.toFixed(2)}
        </p>
        <button
          onClick={handleAdd}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded"
        >
          {t("addToCart")}
        </button>
      </div>
    </div>
  );
}

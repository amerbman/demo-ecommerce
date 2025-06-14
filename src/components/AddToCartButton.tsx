"use client";

import { useCart } from "@/context/CartContext";
import React from "react";

interface Props {
  partNumber: string;
  name: string;
  price: number;
  image: string;
}

export default function AddToCartButton({
  partNumber,
  name,
  price,
  image,
}: Props) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() =>
        addItem(
          { id: partNumber, name, price, image },
          1
        )
      }
      className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
    >
      Add to Cart
    </button>
  );
}

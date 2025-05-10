// src/app/components/ProductCard.tsx
import React from 'react';

export interface StaticProduct {
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ name, price, image }: StaticProduct) {
  return (
    <div className="w-full max-w-xs mx-auto border rounded-md overflow-hidden shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
      <div className="relative w-full h-60">
        <img
          src={image}
          alt={name}
          className="object-contain w-full h-full rounded-md"
        />
      </div>
      <div className="p-2">
        <h3 className="font-medium mb-1 text-center text-sm">{name}</h3>
        <p className="text-lg font-semibold text-center mb-2">${price.toFixed(2)}</p>
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

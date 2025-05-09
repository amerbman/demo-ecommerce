// src/app/components/ProductCard.tsx
import React from 'react'

export interface StaticProduct {
  name: string
  price: number
  image: string
}

export default function ProductCard({ name, price, image }: StaticProduct) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-transform transform hover:-translate-y-1">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-contain"
      />
      <div className="p-4">
        <h3 className="font-medium mb-2">{name}</h3>
        <p className="text-lg font-semibold mb-4">${price.toFixed(2)}</p>
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

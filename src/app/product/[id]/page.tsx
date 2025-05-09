// src/app/product/[id]/page.tsx
import { notFound } from 'next/navigation'
import productsData from '../../data/products.json'
import Link from 'next/link'

type Params = { params: { id: string } }

// Tell Next.js which product IDs to pre-render
export function generateStaticParams(): Params['params'][] {
  const allProducts = Object.values(productsData.flora)
    .filter(Array.isArray)
    .flat()
  return allProducts.map(p => ({ id: p.id }))
}

export default function ProductPage({ params }: Params) {
  // find the product by ID
  const allProducts = Object.values(productsData.flora)
    .filter(Array.isArray)
    .flat()
  const product = allProducts.find(p => p.id === params.id)

  if (!product) return notFound()

  return (
    <main className="container mx-auto py-16">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.image[0]}
        alt={product.name}
        className="w-full max-w-md mb-6"
      />
      <p className="mb-2">Part #: {product.part_number}</p>
      <p className="mb-2">Quantity: {product.quantity}</p>
      <Link href="/shop" className="text-red-600 hover:underline">
        ← Back to Shop
      </Link>
    </main>
  )
}

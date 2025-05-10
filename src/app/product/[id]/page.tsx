import { notFound } from 'next/navigation';
import productsData from '../../data/products.json';
import { ProductsData } from '@/Product'; // Import the correct type
import Link from 'next/link';
import Carousel from '@/components/Carousel';

type Params = { params: { id: string } };

// Type assertion for imported JSON data
const data: ProductsData = productsData;

// Generate static params for Next.js
export function generateStaticParams(): Params['params'][] {
  const allProducts = Object.values(data.flora)
    .filter(Array.isArray)
    .flat();
  return allProducts.map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: Params) {
  // Flatten all products from all categories
  const allProducts = Object.values(data.flora)
    .filter(Array.isArray)
    .flat();

  // Find the product by ID
  const product = allProducts.find((p) => p.id === params.id);
  if (!product) return notFound();

  // Find the product category safely
  const productCategory = Object.keys(data.flora).find((key) => {
    const categoryProducts = data.flora[key as keyof typeof data.flora];
    return Array.isArray(categoryProducts) && categoryProducts.some((p) => p.id === product.id);
  });

  // Get related products from the correct category
  const relatedProducts = productCategory
    ? data.flora[productCategory as keyof typeof data.flora].filter((p) => p.id !== product.id).slice(0, 4)
    : [];

  return (
    <main className="container mx-auto py-16 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Carousel */}
        <div className="w-full">
          <Carousel images={product.image} altText={product.name} />
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">
            {product.description || 'No description available.'}
          </p>
          <p className="text-2xl font-semibold text-red-600">
            ${product.price.toFixed(2)}
          </p>
          <p className={`font-medium ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
            {product.in_stock ? 'In Stock' : 'Out of Stock'}
          </p>

          <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">
            Add to Cart
          </button>
          <Link href="/shop" className="text-red-600 hover:underline mt-2">
            ← Back to Shop
          </Link>

          {/* Social Media Sharing */}
          <div className="mt-6 space-x-4">
            <p className="text-gray-500">Share this product:</p>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-2 py-1 rounded">Facebook</button>
              <button className="bg-blue-400 text-white px-2 py-1 rounded">Twitter</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Instagram</button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <Link key={rel.id} href={`/product/${rel.id}`} className="block bg-white p-4 rounded shadow hover:shadow-lg">
                <img
                  src={rel.image[0]}
                  alt={rel.name}
                  className="w-full h-40 object-contain mb-2"
                />
                <h3 className="text-lg font-semibold">{rel.name}</h3>
                <p className="text-gray-600">${rel.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

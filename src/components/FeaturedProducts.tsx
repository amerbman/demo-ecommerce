import React from 'react';
import Link from 'next/link';

interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const products: Product[] = [
  { id: "F400", name: "Mop Pro", description: "High quality mop for spotless cleaning", price: 19.99, image: "/product_images/flora/cleaning_sets/cleaning_set_1.jpg" },
  { id: "F077", name: "Broom Pro", description: "Durable broom for everyday use", price: 14.99, image: "/product_images/flora/dustpans_brooms/dustpans_brooms_1.jpg" },
  { id: "F021", name: "Brush Pro", description: "Soft bristles for gentle cleaning", price: 9.99, image: "/product_images/flora/brushes/brushes_2.jpg" },
  { id: "F368", name: "Scrubber", description: "Heavy-duty scrubber for tough stains", price: 7.99, image: "/product_images/flora/wipers_squeegees/wipers_squeegees_1.jpg" },
];

const FeaturedProducts: React.FC = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Link href={`/product/${String(product.id)}`} key={product.id}>
                            <div className="bg-white p-3 rounded-lg shadow-md flex flex-col justify-between h-full max-w-xs mx-auto">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-34 object-contain mb-2"
                                />
                                <h3 className="text-base font-semibold mb-1 text-center">{product.name}</h3>
                                <p className="text-gray-600 text-xs text-center mb-1">{product.description}</p>
                                <p className="text-black font-bold text-center mb-2">${product.price.toFixed(2)}</p>
                                <button className="mt-auto bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;

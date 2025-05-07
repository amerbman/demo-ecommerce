import React from 'react';

const FeaturedProducts: React.FC = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold">Product {index + 1}</h3>
                            <p className="text-black">High quality cleaning product</p>
                            <button className="mt-2 bg-primary text-white px-3 py-1 rounded">Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;

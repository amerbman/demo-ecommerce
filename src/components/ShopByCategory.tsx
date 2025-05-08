// components/ShopByCategory.tsx
import React from 'react';

interface Category {
  title: string;
  description: string;
  image: string;
  href: string;
}

const categories: Category[] = [
  {
    title: 'Brooms',
    description: 'Traditional and modern brooms for all floor types',
    image: '/assets/categories/brooms.jpg',
    href: '/shop/brooms',
  },
  {
    title: 'Brushes',
    description: 'Specialized brushes for every cleaning challenge',
    image: '/assets/categories/brushes.jpg',
    href: '/shop/brushes',
  },
  {
    title: 'Mops',
    description: 'Advanced mop systems for sparkling clean floors',
    image: '/assets/categories/mops.jpg',
    href: '/shop/mops',
  },
  // add more categories here if you need
];

const ShopByCategory: React.FC = () => (
  <section className="bg-white py-16">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl lg:text-4xl font-extrabold mb-2">Shop By Category</h2>
      <p className="text-gray-600 mb-10">
        Find the perfect cleaning tool for every task in your home
      </p>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <a
            key={cat.title}
            href={cat.href}
            className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
              <p className="text-gray-600 mb-4">{cat.description}</p>
              <span className="text-blue-600 font-medium">
                Shop {cat.title} &rarr;
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default ShopByCategory;

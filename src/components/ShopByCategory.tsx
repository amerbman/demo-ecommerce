// src/app/components/ShopByCategory.tsx
import Link from 'next/link';

interface Category {
  title: string;
  description: string;
  image: string;
  key: string;     // the exact JSON category key
}

const categories: Category[] = [
  {
    title: 'Brooms',
    key: 'DUSTPANS AND BROOMS',
    description: 'Traditional and modern brooms for all floor types',
    image: '/product_images/flora/dustpans_brooms/dustpans_brooms_1.jpg',
  },
  {
    title: 'Brushes',
    key: 'BRUSHES',
    description: 'Specialized brushes for every cleaning challenge',
    image: '/product_images/flora/brushes/brushes_1.1.jpg',
  },
  {
    title: 'Mops',
    key: 'CLEANING SETS & MULTIPURPOSE BUCKETS',
    description: 'Advanced mop systems for sparkling clean floors',
    image: '/product_images/flora/cleaning_sets/cleaning_set_3.jpg',
  },
  // …more categories, matching your JSON keys
];

export default function ShopByCategory() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-2">
          Shop By Category
        </h2>
        <p className="text-gray-600 mb-10">
          Find the perfect cleaning tool for every task in your home
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              href={`/shop?category=${encodeURIComponent(cat.key)}`}
              className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-48 object-contain"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                <p className="text-gray-600 mb-4">{cat.description}</p>
                <span className="text-blue-600 font-medium">
                  Shop {cat.title} &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

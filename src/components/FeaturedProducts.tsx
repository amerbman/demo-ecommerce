"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface Product {
  id: string;
  price: number;
  image: string;
}

export default function FeaturedProducts() {
  const t = useTranslations('featuredProducts');
  const params = useParams();
  const locale = (params.locale as string) || 'en';

  const products: Product[] = [
    { id: "F400", price: 19.99, image: "/product_images/flora/cleaning_sets/cleaning_set_1.jpg" },
    { id: "F077", price: 14.99, image: "/product_images/flora/dustpans_brooms/dustpans_brooms_1.jpg" },
    { id: "F021", price: 9.99, image: "/product_images/flora/brushes/brushes_2.jpg" },
    { id: "F368", price: 7.99, image: "/product_images/flora/wipers_squeegees/wipers_squeegees_1.jpg" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-8">{t('heading')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              href={`/${locale}/product/${product.id}`}
              key={product.id}
              className="block max-w-xs mx-auto"
            >
              <div className="bg-white p-3 rounded-lg shadow-md flex flex-col justify-between h-full">
                {/* Use fixed width/height for Image to ensure rendering */}
                <Image
                  src={product.image}
                  alt={t(`products.${product.id}.name`)}
                  width={150}
                  height={150}
                  className="object-contain mb-2 w-full h-auto"
                />
                <h3 className="text-base font-semibold mb-1 text-center">
                  {t(`products.${product.id}.name`)}
                </h3>
                <p className="text-gray-600 text-xs text-center mb-1">
                  {t(`products.${product.id}.description`)}
                </p>
                <p className="text-black font-bold text-center mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <button className="mt-auto bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                  {t('addToCart')}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
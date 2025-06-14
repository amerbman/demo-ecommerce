'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

interface Product {
  src: string;
  title: string;
  description: string;
}

const Hero: React.FC = () => {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const navItems = [
    { label: t('shopLabel'), path: `/${locale}/shop`, isButton: true },
  ];

  // Static array of 5 hero products
  const products: Product[] = [
    { src: '/product_images/flora/brushes/brushes_1.1.jpg', title: t('productTitle1'), description: t('productDescription1') },
    { src: '/product_images/flora/brushes/brushes_1.2.jpg', title: t('productTitle2'), description: t('productDescription2') },
    { src: '/product_images/flora/cleaning_sets/cleaning_set_1.jpg', title: t('productTitle3'), description: t('productDescription3') },
    { src: '/product_images/flora/wipers_squeegees/wipers_squeegees_4.jpg', title: t('productTitle4'), description: t('productDescription4') },
    { src: '/product_images/flora/toilet_brushes/toilet_brushes_1.jpg', title: t('productTitle5'), description: t('productDescription5') },
  ];

  const FLIP_INTERVAL = 3000; // adjust timing (ms)

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-flip
  useEffect(() => {
    const iv = setInterval(() => setCurrentIndex(i => (i + 1) % products.length), FLIP_INTERVAL);
    return () => clearInterval(iv);
  }, [products.length]);

  const prevSlide = () => setCurrentIndex(i => (i - 1 + products.length) % products.length);
  const nextSlide = () => setCurrentIndex(i => (i + 1) % products.length);

  const TextSection = (
        <div
         className={`text-black p-6 rounded-md w-full lg:w-2/3 lg:max-w-3xl mx-auto -mt-12 text-center ${
            isRtl ? 'lg:text-right' : 'lg:text-left'
         }`}
      >
      <h1 className="text-4xl lg:text-6xl font-extrabold">
        {t('title1')}<br />
        {t('title2')}
      </h1>
      <p className="text-lg lg:text-2xl mb-6">{t('description')}</p>
      {navItems.map(({ label, path, isButton }) =>
        isButton ? (
          <Link key={label} href={path}>
            <button className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium transition">
              {t('cta')}
            </button>
          </Link>
        ) : (
          <Link key={label} href={path} className="text-gray-700 hover:text-red-600 font-medium transition">
            {label}
          </Link>
        )
      )}
    </div>
  );

  const CardSection = (
    <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-xl w-full max-w-sm lg:w-96 mx-auto mt-4 lg:mt-0 relative animate-slow-rotate">
      <div className="flex flex-col items-center">
        <div className="relative w-full h-40 lg:h-52 rounded-xl mb-4 overflow-hidden">
          <Image src={products[currentIndex].src} alt={products[currentIndex].title} fill className="object-cover" />
        </div>
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2 text-center">
          {products[currentIndex].title}
        </h3>
        <p className="text-gray-600 text-sm lg:text-base text-center">
          {products[currentIndex].description}
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <button onClick={prevSlide} aria-label={t('prev')} className="text-gray-400 hover:text-gray-600 text-2xl">
            &#10094;
          </button>
          <button onClick={nextSlide} aria-label={t('next')} className="text-gray-400 hover:text-gray-600 text-2xl">
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="relative h-auto lg:h-screen bg-fixed bg-cover bg-center px-4 lg:px-8 py-16 overflow-hidden"
      style={{ backgroundImage: "url('/assets/flora_products.png')" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
        {isRtl ? (
          <>
            {CardSection}
            {TextSection}
          </>
        ) : (
          <>
            {TextSection}
            {CardSection}
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;

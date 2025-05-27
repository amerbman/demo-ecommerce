'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

const Hero: React.FC = () => {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const navItems = [
    { label: t('shopLabel'), path: `/${locale}/shop`, isButton: true },
  ];

  const TextSection = (
    <div className="text-black p-6 rounded-md w-full lg:w-2/3 lg:max-w-3xl mx-auto mt-[-50px] lg:mt-[-50px] text-center lg:text-left">
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
          <Link
            key={label}
            href={path}
            className="text-gray-700 hover:text-red-600 font-medium transition"
          >
            {label}
          </Link>
        )
      )}
    </div>
  );

  const CardSection = (
    <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-xl w-full max-w-sm lg:w-96 mx-auto animate-slow-rotate mt-4 lg:mt-0">
      <div className="flex flex-col items-center">
        <div className="relative w-full h-40 lg:h-52 rounded-xl mb-4 overflow-hidden">
          <Image
            src="/product_images/flora/brushes/brushes_1.1.jpg"
            alt={t('productTitle')}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
          {t('productTitle')}
        </h3>
        <p className="text-gray-600 text-sm lg:text-base">
          {t('productDescription')}
        </p>
        <div className="flex justify-center space-x-2 mt-4">
          <button aria-label={t('prev')} className="text-gray-400 hover:text-gray-600">
            &#10094;
          </button>
          <button aria-label={t('next')} className="text-gray-400 hover:text-gray-600">
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

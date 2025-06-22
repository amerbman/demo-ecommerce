// src/app/[locale]/product/[id]/page.tsx
import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Carousel from '@/components/Carousel';
import AddToCartButton from '@/components/AddToCartButton';

interface Props {
  params: { locale: string; id: string };
}

// Full product type from Supabase
type DBProduct = {
  name: string;
  name_ar?: string;
  description: string;
  description_ar?: string;
  price?: number;
  in_stock: boolean;
  images: string[];
  category: string;
  part_number: string;
};

// Related products subset
type RelatedProduct = {
  part_number: string;
  name: string;
  name_ar?: string;
  price?: number;
  images: string[];
};

export default async function ProductPage({ params }: Props) {
  const { locale, id } = params;

  // Create Supabase client for Server Component
  const supabase = createServerComponentClient({ cookies });

  // Fetch main product
  const { data: productData, error } = await supabase
    .from<DBProduct>('products')
    .select('name, name_ar, description, description_ar, price, in_stock, images, category, part_number')
    .eq('part_number', id)
    .single();

  if (error || !productData) {
    return notFound();
  }

  // Fetch related products by category
  const { data: relatedData } = await supabase
    .from<RelatedProduct>('products')
    .select('part_number, name, name_ar, price, images')
    .eq('category', productData.category)
    .neq('part_number', id)
    .limit(4);
  const related = relatedData ?? [];

  // Determine locale-specific fields
  const displayName =
    locale === 'ar' && productData.name_ar
      ? productData.name_ar
      : productData.name;
  const displayDesc =
    locale === 'ar' && productData.description_ar
      ? productData.description_ar
      : productData.description;

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{displayName}</h1>
      <Carousel images={productData.images} altText={displayName} />
      <p className="mt-4 text-gray-700">{displayDesc}</p>
      <div className="mt-4 flex items-center space-x-4">
        <span className="text-xl font-semibold">
          {productData.price?.toFixed(2)} SAR
        </span>
        <span
          className={`font-medium ${
            productData.in_stock ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {productData.in_stock
            ? locale === 'ar'
              ? 'متوفر'
              : 'In Stock'
            : locale === 'ar'
            ? 'نفذت الكمية'
            : 'Out of Stock'}
        </span>
      </div>

      <AddToCartButton
        partNumber={productData.part_number}
        name={displayName}
        price={productData.price ?? 0}
        image={productData.images[0]}
      />

      <Link
        href={`/${locale}/shop`}
        className="inline-block mt-6 text-blue-600 hover:underline"
      >
        ← {locale === 'ar' ? 'عودة إلى المتجر' : 'Back to shop'}
      </Link>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            {locale === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((rel) => {
              const relName =
                locale === 'ar' && rel.name_ar ? rel.name_ar : rel.name;
              return (
                <Link
                  key={rel.part_number}
                  href={`/${locale}/product/${rel.part_number}`}
                  className="block border rounded-lg p-4 hover:shadow-lg"
                >
                  <div className="relative w-full h-40 mb-2">
                    <Image
                      src={rel.images[0]}
                      alt={relName}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{relName}</h3>
                  <p className="text-gray-600">
                    {rel.price?.toFixed(2)} SAR
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}

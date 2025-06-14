// src/app/[locale]/product/[id]/page.tsx
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Carousel from '@/components/Carousel';
import AddToCartButton from '@/components/AddToCartButton';

// Initialize Supabase client for server-side
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface Props {
  params: { locale: string; id: string };
}

// Full product type from Supabase
interface DBProduct {
  name: string;
  name_ar?: string;
  description: string;
  description_ar?: string;
  price?: number;
  in_stock: boolean;
  images: string[];
  category: string;
  part_number: string;
}

// Related products subset
interface RelatedProduct {
  part_number: string;
  name: string;
  name_ar?: string;
  price?: number;
  images: string[];
}

export default async function ProductPage({ params }: Props) {
  // Fetch main product
  const res = await supabase
    .from('products')
    .select(
      'name, name_ar, description, description_ar, price, in_stock, images, category, part_number'
    )
    .eq('part_number', params.id)
    .single();
  const productData = res.data as DBProduct | null;
  if (!productData || res.error) {
    return notFound();
  }

  // Fetch related products by category
  const relRes = await supabase
    .from('products')
    .select('part_number, name, name_ar, price, images')
    .eq('category', productData.category)
    .neq('part_number', params.id)
    .limit(4);
  const related = (relRes.data as RelatedProduct[] | null) ?? [];

  // Determine locale-specific fields
  const displayName =
    params.locale === 'ar' && productData.name_ar
      ? productData.name_ar
      : productData.name;
  const displayDesc =
    params.locale === 'ar' && productData.description_ar
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
            ? params.locale === 'ar'
              ? 'متوفر'
              : 'In Stock'
            : params.locale === 'ar'
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
        href={`/${params.locale}/shop`}
        className="inline-block mt-6 text-blue-600 hover:underline"
      >
        ← {params.locale === 'ar' ? 'عودة إلى المتجر' : 'Back to shop'}
      </Link>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            {params.locale === 'ar' ? 'منتجات ذات صلة' : 'Related Products'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((rel) => {
              const relName =
                params.locale === 'ar' && rel.name_ar ? rel.name_ar : rel.name;
              return (
                <Link
                  key={rel.part_number}
                  href={`/${params.locale}/product/${rel.part_number}`}
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

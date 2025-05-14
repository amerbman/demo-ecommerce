"use client";

import { notFound } from "next/navigation";
import productsData from "../../data/products.json";
import type { Product } from "@/types/product";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const t = useTranslations("Product");
  const params = useParams() as { locale?: string; id?: string };
  const locale = params.locale ?? "en";
  const productId = params.id ?? "";

  // Treat flora as unknown and filter arrays
  const floraRaw = productsData.flora as unknown;
  const entries = Object.entries(floraRaw as Record<string, unknown>)
    .filter(([, v]) => Array.isArray(v)) as [string, Product[]][];

  // Flatten products
  const allProducts = entries.flatMap(([, arr]) => arr);

  // Find selected product
  const product = allProducts.find(p => p.id === productId);
  if (!product) return notFound();

  // Related products in same category
  const productCategory = entries.find(([, arr]) => arr.some(p => p.id === product.id))?.[0];
  const relatedProducts = productCategory
    ? (entries.find(([k]) => k === productCategory)![1] as Product[])
        .filter(p => p.id !== product.id)
        .slice(0, 4)
    : [];

  // Display fields based on locale
  const displayName = locale === "ar" && product.name_ar ? product.name_ar : product.name;
  const displayDesc = locale === "ar" && product.description_ar ? product.description_ar : product.description;

  return (
    <main className="container mx-auto py-16 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Carousel */}
        <div className="w-full h-60 lg:h-[32rem]">
          <Carousel images={product.image} altText={displayName} />
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{displayName}</h1>
          <p className="text-gray-600">{displayDesc || t("noDescription")}</p>
          <p className="text-2xl font-semibold text-red-600">
            ${ (product.price ?? 0).toFixed(2) }
          </p>
          <p className={`font-medium ${product.in_stock ? "text-green-600" : "text-red-600"}`}>
            {product.in_stock ? t("inStock") : t("outOfStock")}
          </p>

          <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">
            {t("addToCart")}
          </button>
          <Link href={`/${locale}/shop`} className="text-red-600 hover:underline mt-2 block">
            ← {t("backToShop")}
          </Link>

          {/* Social Media Sharing */}
          <div className="mt-6 space-x-4">
            <p className="text-gray-500">{t("share")}</p>
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
          <h2 className="text-2xl font-bold">{t("relatedProducts")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map(rel => {
              const name = locale === "ar" && rel.name_ar ? rel.name_ar : rel.name;
              return (
                <Link key={rel.id} href={`/${locale}/product/${rel.id}`} className="block bg-white p-4 rounded shadow hover:shadow-lg">
                  <div className="relative w-full h-40 mb-2">
                    <Image src={rel.image[0]} alt={name} fill className="object-contain" />
                  </div>
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-gray-600">
                    ${ (rel.price ?? 0).toFixed(2) }
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
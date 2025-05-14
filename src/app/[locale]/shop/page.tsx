"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import productsData from "../data/products.json";
import type { Product } from "../../../types/product";
import ProductCard from "@/components/ProductCard";
import LogoFlora from "@/components/LogoFlora";
import LogoFlosoft from "@/components/LogoFlosoft";
import BrandInfo from "@/components/BrandInfo";
import { useTranslations } from "next-intl";
import { formatCategory } from "@/utils/formatCategory";

interface Brand {
  name: string;
  Logo: React.FC<React.SVGProps<SVGSVGElement>>;
  description: string;
  bannerImage: string;
}

// Number of products to show per page
const PRODUCTS_PER_PAGE = 12;

export default function ShopPage() {
  const t = useTranslations("Shop");
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params.locale ?? "en";
  const initialCategory = searchParams.get("category") ?? "All";

  // Treat flora entry as unknown and filter arrays at runtime
  const floraRaw = (productsData.flora as unknown) as Record<string, unknown>;
  const floraEntries = Object.entries(floraRaw).filter(
    ([, value]) => Array.isArray(value)
  ) as [string, Product[]][];

  const brands: Brand[] = [
    {
      name: "Flora",
      Logo: LogoFlora,
      description: t("floraDescription"),
      bannerImage: "/assets/brandinfo1.jpg",
    },
    {
      name: "Flosoft",
      Logo: LogoFlosoft,
      description: t("flosoftDescription"),
      bannerImage: "/assets/flosoft_logo.jpg",
    },
  ];

  const [brand, setBrand] = useState<string>(brands[0].name);
  const [category, setCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(PRODUCTS_PER_PAGE);

  useEffect(() => {
    setCategory(searchParams.get("category") ?? "All");
  }, [searchParams]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(PRODUCTS_PER_PAGE);
  }, [brand, category, searchQuery]);

  // Flatten and categorize only array entries
  const allProducts: (Product & { category: string; brand: string })[] = useMemo(
    () =>
      floraEntries.flatMap(([cat, arr]) =>
        arr.map((p) => ({
          ...p,
          category: cat,
          brand: "Flora",
        }))
      ),
    [floraEntries]
  );

  // Extract unique categories based on selected brand
  const categories = useMemo(() => {
    const prods = allProducts.filter((p) => p.brand === brand);
    return ["All", ...Array.from(new Set(prods.map((p) => p.category)))];
  }, [allProducts, brand]);

  // Filter products by brand, category, and search query
  const filtered = useMemo(
    () =>
      allProducts.filter((p) => {
        if (p.brand !== brand) return false;
        if (category !== "All" && p.category !== category) return false;
        if (searchQuery) {
          const nameToSearch =
            locale === "ar" && p.name_ar ? p.name_ar : p.name;
          if (!nameToSearch.toLowerCase().includes(searchQuery.toLowerCase()))
            return false;
        }
        return true;
      }),
    [allProducts, brand, category, searchQuery, locale]
  );

  const selectedBrand = brands.find((b) => b.name === brand)!;

  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8 space-y-12">
      {/* Brand Selector */}
      <div className="space-y-4 text-center">
        <div className="flex justify-center space-x-8">
          {brands.map(({ name, Logo }) => (
            <button
              key={name}
              onClick={() => {
                setBrand(name);
                setCategory("All");
                setSearchQuery("");
              }}
              className={`p-2 rounded transition ${
                brand === name
                  ? "bg-gray-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Logo className="h-12 w-auto" />
            </button>
          ))}
        </div>
        <div className="w-full mx-auto">
          <BrandInfo
            brand={selectedBrand.name}
            description={selectedBrand.description}
            bannerImage={selectedBrand.bannerImage}
          />
        </div>
      </div>

      {/* Category & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded transition ${
                category === c
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {t(`categories.${formatCategory(c)}`)}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 flex-1 sm:flex-none w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Product Grid with pagination */}
      {filtered.length > 0 ? (
        <>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filtered.slice(0, visibleCount).map((p) => {
              const displayName =
                locale === "ar" && p.name_ar ? p.name_ar : p.name;
              const displayDesc =
                locale === "ar" && p.description_ar
                  ? p.description_ar
                  : p.description;
              return (
                <li key={p.id}>
                  <Link href={`/${locale}/product/${p.id}`} className="block">
                    <ProductCard
                      name={displayName}
                      description={displayDesc}
                      price={p.price ?? 0}
                      image={p.image[0]}
                      id={p.id}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {visibleCount < filtered.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount((c) => c + PRODUCTS_PER_PAGE)}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {t("loadMore")}
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">{t("noProductsFound")}</p>
      )}
    </main>
  );
}

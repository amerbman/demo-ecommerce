// src/app/[locale]/shop/ShopClient.tsx
"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { createClient } from "@supabase/supabase-js"

import ProductCard from "@/components/ProductCard"
import LogoFlora from "@/components/LogoFlora"
import LogoFlosoft from "@/components/LogoFlosoft"
import BrandInfo from "@/components/BrandInfo"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function normalizeKey(str: string) {
  return str
    .toLowerCase()
    .replace(/[\s&\/]+/g, "_")
    .replace(/[^\w_]/g, "")
}

interface Brand {
  name: string
  Logo: React.FC<React.SVGProps<SVGSVGElement>>
  descKey: string
  banner: string
}

interface Product {
  part_number: string
  name: string
  name_ar?: string
  price: number
  images: string[]
  category: string
  brand: string
}

export default function ShopClient({
  locale,
  initialCategory,
}: {
  locale: string
  initialCategory: string
}) {
  const t = useTranslations("Shop")
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [brand, setBrand] = useState<Brand["name"]>("Flora")
  const [category, setCategory] = useState(normalizeKey(initialCategory) || "all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    supabase
      .from("products")
      .select("part_number,name,name_ar,price,images,category,brand")
      .then(({ data, error }) => {
        if (error) console.error("Failed to fetch products:", error.message)
        else setAllProducts(data || [])
      })
  }, [])

  const categories = useMemo(() => {
    const raw = allProducts
      .filter((p) => p.brand === brand)
      .map((p) => normalizeKey(p.category))
    const unique = Array.from(new Set(raw))
    unique.unshift("all")
    return unique.map((key) => ({
      key,
      label:
        locale === "ar"
          ? t(`categories.${key}`, { fallback: key })
          : allProducts.find((p) => normalizeKey(p.category) === key)?.category ||
            key,
    }))
  }, [allProducts, brand, locale, t])

  const filtered = useMemo(
    () =>
      allProducts.filter((p) => {
        if (p.brand !== brand) return false
        if (category !== "all" && normalizeKey(p.category) !== category) return false
        if (
          searchQuery &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
          return false
        return true
      }),
    [allProducts, brand, category, searchQuery]
  )

  const selectedBrand = [{ name: "Flora", Logo: LogoFlora, descKey: "floraDescription", banner: "/assets/brandinfo1.jpg" },
                         { name: "Flosoft", Logo: LogoFlosoft, descKey: "flosoftDescription", banner: "/assets/flosoft_logo.jpg" }]
                         .find(b => b.name === brand)!

  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8 space-y-8">
      {/* Brand Selector */}
      <div className="space-y-4 text-center">
        <div className="flex justify-center space-x-8">
          {["Flora","Flosoft"].map((name) => {
            const Logo = name === "Flora" ? LogoFlora : LogoFlosoft
            return (
              <button
                key={name}
                onClick={() => { setBrand(name); setCategory("all"); setSearchQuery("") }}
                className={`p-2 rounded transition ${
                  brand === name ? "bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <Logo className="h-12 w-auto" />
              </button>
            )
          })}
        </div>
        <BrandInfo
          brand={selectedBrand.name}
          description={t(selectedBrand.descKey)}
          bannerImage={selectedBrand.banner}
        />
      </div>

      {/* Category & Search */}
      <div className="flex items-center justify-between gap-4">
        {/* Render SEARCH first in Arabic, CATEGORIES first in English */}
        {locale === "ar" ? (
          <>
            <input
              dir="rtl"
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded p-2 flex-1 sm:flex-none w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-primary text-right"
            />
            <div className="flex flex-wrap gap-2 flex-row-reverse">
              {categories.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  dir="rtl"
                  className={`px-4 py-2 rounded transition ${
                    category === key ? "bg-red-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              {categories.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  dir="ltr"
                  className={`px-4 py-2 rounded transition ${
                    category === key ? "bg-red-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              dir="ltr"
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded p-2 flex-1 sm:flex-none w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-primary text-left"
            />
          </>
        )}
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <li key={p.part_number} className="space-y-2">
              <Link href={`/${locale}/product/${p.part_number}`} className="block">
                <ProductCard
                  id={p.part_number}
                  name={locale === "ar" && p.name_ar ? p.name_ar : p.name}
                  price={p.price}
                  image={p.images[0]}
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">{t("noProductsFound")}</p>
      )}
    </main>
  )
}
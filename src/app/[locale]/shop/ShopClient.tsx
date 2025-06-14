"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import LogoFlora from "@/components/LogoFlora"
import LogoFlosoft from "@/components/LogoFlosoft"
import BrandInfo from "@/components/BrandInfo"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Brand {
  name: string
  Logo: React.FC<React.SVGProps<SVGSVGElement>>
  description: string
  bannerImage: string
}

interface Product {
  part_number: string
  name: string
  name_ar?: string
  price: number
  images: string[]
  category: string
  brand?: string
}

export default function ShopClient({ locale, initialCategory }: { locale: string; initialCategory: string }) {
  const brands: Brand[] = [
    {
      name: "Flora",
      Logo: LogoFlora,
      description: "Flora offers eco-friendly, high-quality cleaning tools built to last.",
      bannerImage: "/assets/brandinfo1.jpg",
    },
    {
      name: "Flosoft",
      Logo: LogoFlosoft,
      description: "Flosoft brings you innovative, soft-touch household accessories.",
      bannerImage: "/assets/flosoft_logo.jpg",
    },
  ]

  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [brand, setBrand] = useState<string>(brands[0].name)
  const [category, setCategory] = useState<string>(initialCategory)
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("part_number, name, name_ar, price, images, category")
      if (error) {
        console.error("Failed to fetch products:", error.message)
      } else {
        setAllProducts(data ?? [])
      }
    }
    fetchProducts()
  }, [])

  const categories = useMemo(() => {
    const cats = allProducts
      .filter((p) => !p.brand || p.brand === brand)
      .map((p) => p.category)
    return ["All", ...Array.from(new Set(cats))]
  }, [allProducts, brand])

  const filtered = useMemo(
    () =>
      allProducts.filter((p) => {
        if (p.brand && p.brand !== brand) return false
        if (category !== "All" && p.category !== category) return false
        if (
          searchQuery &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
          return false
        return true
      }),
    [allProducts, brand, category, searchQuery]
  )

  const selectedBrand = brands.find((b) => b.name === brand)!

  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto py-8 space-y-12">
      {/* Brand Selector */}
      <div className="space-y-4 text-center">
        <div className="flex justify-center space-x-8">
          {brands.map(({ name, Logo }) => (
            <button
              key={name}
              onClick={() => {
                setBrand(name)
                setCategory("All")
                setSearchQuery("")
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
        <BrandInfo
          brand={selectedBrand.name}
          description={selectedBrand.description}
          bannerImage={selectedBrand.bannerImage}
        />
      </div>

      {/* Category Buttons & Search */}
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
              {c}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 flex-1 sm:flex-none w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-primary"
        />
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
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </main>
  )
}
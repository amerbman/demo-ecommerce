export const dynamic = 'force-dynamic'
export const revalidate = 0

import ShopClient from "./ShopClient"

export default function ShopPage({ params, searchParams }: {
  params: { locale: string }
  searchParams: { [key: string]: string | string[] }
}) {
  const locale = params.locale
  const initialCategory =
    typeof searchParams.category === "string" ? searchParams.category : "All"
  return <ShopClient locale={locale} initialCategory={initialCategory} />
}

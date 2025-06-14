export const dynamic = 'force-dynamic'

import { ReactNode } from "react"
import ClientLayout from "@/components/ClientLayout"
import Providers from "@/components/Providers"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type LocaleLayoutProps = {
  children: ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = params

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound()
  }

  // Load locale-specific messages
  const messages = (await import(`../../../messages/${locale}.json`)).default

  return (
    <Providers locale={locale} messages={messages}>
      <ClientLayout>{children}</ClientLayout>
    </Providers>
  )
}

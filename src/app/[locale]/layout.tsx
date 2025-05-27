// src/app/[locale]/layout.tsx
import { ReactNode } from "react";
import ClientLayout from "@/components/ClientLayout";
import Providers from "@/components/Providers";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: { locale: string }; // ✅ FIXED: Removed Promise<>
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = params; // ✅ This is now correct

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <Providers locale={locale} messages={messages}>
      <ClientLayout>{children}</ClientLayout>
    </Providers>
  );
}

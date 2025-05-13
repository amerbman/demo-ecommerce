// src/app/[locale]/layout.tsx
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import ClientLayout from "@/components/ClientLayout";

// Tell Next.js which locales to pre-render
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}
export const dynamicParams = false;

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  // load the correct messages file
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const isRtl = locale === "ar";

  return (
    // This is no longer <html>/<body> — just a wrapper
    <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "rtl" : ""}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ClientLayout>{children}</ClientLayout>
      </NextIntlClientProvider>
    </div>
  );
}

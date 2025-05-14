import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import ClientLayout from "@/components/ClientLayout";

export interface Props {
  children: ReactNode;
  params: { locale: string };
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const isRtl = locale === "ar";

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Riyadh">
      <ClientLayout>
        <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "rtl" : "ltr"}>
          {children}
        </div>
      </ClientLayout>
    </NextIntlClientProvider>
  );
}

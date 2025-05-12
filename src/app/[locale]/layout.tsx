import "../../styles/globals.css";
import "../../styles/nprogress.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import ClientLayout from "@/components/ClientLayout";
import { NextIntlClientProvider } from "next-intl";

config.autoAddCss = false;

// Pre-render exactly these two locales
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

// Disable any other on-the-fly locale params
export const dynamicParams = false;

export const metadata = {
  title: "Flora E-commerce",
  description: "Cleaning products for every need",
};

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Extract locale from parameters
  const { locale } = params;

  // Dynamically import the correct nested JSON messages
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`bg-gray-50 text-gray-900 ${locale === "ar" ? "rtl" : "ltr"}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

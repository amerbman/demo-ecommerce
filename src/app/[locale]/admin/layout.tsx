// app/[locale]/admin/layout.tsx
import Link from 'next/link';
import React from 'react';
import { useLocale, useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic'; // if you need fresh locale each request

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('admin.layout');
  const locale = useLocale(); // "en" or "ar"
  const isRtl = locale === 'ar';

  return (
    <div className={isRtl ? 'direction-rtl min-h-screen bg-gray-50' : 'min-h-screen bg-gray-50'}>
      <header className="bg-white border-b px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">{t('title')}</h1>
        <nav className="mt-2 md:mt-0">
          <Link
            href={`/${locale}/admin/products`}
            className="mr-6 text-blue-600 hover:underline"
          >
            {t('nav.products')}
          </Link>
          <Link
            href={`/${locale}/admin/orders`}
            className="text-blue-600 hover:underline"
          >
            {t('nav.orders')}
          </Link>
        </nav>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}

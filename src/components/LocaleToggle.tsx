// src/components/LocaleToggle.tsx
'use client';

import Link from 'next/link';
import { usePathname, useParams, useSearchParams } from 'next/navigation';
import React from 'react';

/**
 * A language switcher that toggles between 'en' and 'ar' by rewriting the URL prefix.
 * Preserves any existing query parameters.
 */
export default function LocaleToggle() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams() as { locale?: string };
  const locale = params.locale ?? 'en';
  const otherLocale = locale === 'en' ? 'ar' : 'en';

  // Replace only the first path segment (/en or /ar)
  const regex = new RegExp(`^/${locale}(?=$|/)`);
  let newPath = pathname;
  if (regex.test(pathname)) {
    newPath = pathname.replace(regex, `/${otherLocale}`);
  } else {
    newPath = `/${otherLocale}${pathname}`;
  }

  // Reattach any search params
  const queryString = searchParams.toString();
  const href = queryString ? `${newPath}?${queryString}` : newPath;

  return (
    <Link href={href} locale={false} className="px-3 py-1 border rounded hover:bg-gray-100">
      {locale === 'en' ? 'عربي' : 'English'}
    </Link>
  );
}

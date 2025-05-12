// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

// Define your supported locales
const locales = ['en', 'ar'] as const;
const defaultLocale = 'en';

export default getRequestConfig(async ({ requestLocale }) => {
  // if the incoming locale is unsupported, fall back
  const locale = hasLocale(locales, requestLocale) ? requestLocale : defaultLocale;

  return {
    locale,
    // load the JSON messages for this locale
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});

import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

const locales = ['en', 'ar'] as const;
const defaultLocale = 'en';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = hasLocale(locales, requestLocale) ? requestLocale : defaultLocale;
  console.log('[SERVER] getRequestConfig locale:', locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;
  console.log('[SERVER] Messages title:', messages.Orders?.title);

  return {
    locale,
    messages
  };
});

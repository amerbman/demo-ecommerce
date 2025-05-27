const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin({
  // Required if you use `/[locale]/...` routes
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // or 'always' if you force `/en`, `/ar`
});

module.exports = withNextIntl({
  reactStrictMode: true,
});

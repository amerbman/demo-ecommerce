const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin({
  // Required if you use `/[locale]/...` routes
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // or 'always' if you force /en, /ar
});

module.exports = withNextIntl({
  reactStrictMode: true,
  // Don’t let ESLint or TS errors block your production build:
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});

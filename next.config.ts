// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin({
  // Uses src/i18n/request.ts by default, no extra options needed
});

module.exports = withNextIntl({
  // Enable the App Router
  
  // Your other Next.js settings go here
  eslint: {
    // Warning: only use this if you really don’t care about linting errors in CI/prod
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // Example: if you need custom webpack or images settings, add them below:
  // images: {
  //   domains: ['your-domain.com']
  // },
});

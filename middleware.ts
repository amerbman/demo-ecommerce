import createMiddleware from 'next-intl/middleware';
import { defineRouting } from 'next-intl/routing';

const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});

export default createMiddleware(routing);

export const config = {
  // Adjust the matcher to handle any route except API and static files
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

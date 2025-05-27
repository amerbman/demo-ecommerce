import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { defineRouting } from 'next-intl/routing';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

// i18n routing config
const routing = defineRouting({ locales: ['en', 'ar'], defaultLocale: 'en' });
const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(req: NextRequest) {
  // Run i18n routing first
  const res = intlMiddleware(req) as NextResponse;

  // Refresh Supabase session cookie
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};

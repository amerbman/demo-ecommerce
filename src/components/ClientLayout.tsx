// src/components/ClientLayout.tsx
'use client';

import React, { ReactNode, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import '../styles/nprogress.css';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);

  // Initialize the browser Supabase client
  const supabase = createBrowserSupabaseClient();

  // Only show header/footer on non-auth pages
  const isAuthRoute = pathname.startsWith('/auth');

  useEffect(() => {
    if (first.current) {
      first.current = false;
    } else {
      NProgress.start();
      NProgress.done();
    }
  }, [pathname]);

  return (
    <SessionContextProvider supabaseClient={supabase}>
      {!isAuthRoute && <Header />}
      {children}
      <CartDrawer />
      {!isAuthRoute && <Footer />}
    </SessionContextProvider>
  );
}
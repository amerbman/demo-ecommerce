'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, ReactNode } from 'react';
import NProgress from 'nprogress';
import '../styles/nprogress.css';
import Header from './Header';
import Footer from './Footer';

// ── Configure NProgress ─────────────────────────────────────────────────────
NProgress.configure({
  showSpinner: false,
  speed: 1200,
  trickleSpeed: 400,
  minimum: 0.1,
});
// ─────────────────────────────────────────────────────────────────────────────

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
    } else {
      NProgress.start();
      NProgress.done();
    }
  }, [pathname]);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

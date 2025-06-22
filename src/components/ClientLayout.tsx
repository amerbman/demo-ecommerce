// src/components/ClientLayout.tsx
'use client';

import { ReactNode, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "../styles/nprogress.css";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer"; // ← import the drawer (CartProvider is now in root)

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  speed: 1200,
  trickleSpeed: 400,
  minimum: 0.1,
});

export default function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const first = useRef(true);
  const supabase = createBrowserSupabaseClient();

  // Only show header/footer if not on an auth route
  const isAuthRoute = pathname.startsWith("/auth");

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

      {/* CartDrawer can consume the CartContext defined in root layout */}
      <CartDrawer />

      {!isAuthRoute && <Footer />}
    </SessionContextProvider>
  );
}

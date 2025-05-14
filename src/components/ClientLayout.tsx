"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, ReactNode } from "react";
import NProgress from "nprogress";
import "../styles/nprogress.css";
import { SessionProvider } from "next-auth/react";
import Header from "./Header";
import Footer from "./Footer";
import { CartProvider } from "@/context/CartContext";

NProgress.configure({ showSpinner: false, speed: 1200, trickleSpeed: 400, minimum: 0.1 });

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const first = useRef(true);

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
    <SessionProvider>
      <CartProvider>
        {!isAuthRoute && <Header />}
        {children}
        {!isAuthRoute && <Footer />}
      </CartProvider>
    </SessionProvider>
  );
}

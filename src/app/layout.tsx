// src/app/layout.tsx
import "../styles/globals.css";
import "../styles/nprogress.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { CartProvider } from "@/context/CartContext";

config.autoAddCss = false;

export const metadata = {
  title: "Flora E-commerce",
  description: "Cleaning products for every need",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* CartProvider at the very top so it survives /en ↔ ar navigations */}
        <CartProvider>
          {/* Your app’s pages render here */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

// src/app/layout.tsx
import '../styles/globals.css';
import '../styles/nprogress.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export const metadata = {
  title: 'Flora E-commerce',
  description: 'Cleaning products for every need',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
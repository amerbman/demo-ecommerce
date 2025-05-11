// src/app/layout.tsx
import '../styles/globals.css';
import '../styles/nprogress.css'; // loader styles
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ClientLayout from '../components/ClientLayout';

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
                                     {/* ← wrap here */}
          <ClientLayout>
            {children}
          </ClientLayout>
        
      </body>
    </html>
  );
}

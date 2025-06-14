// app/[locale]/admin/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useTranslations, useLocale } from 'next-intl';

type Product = {
  id: string;
  name: string;
  price: number;
  in_stock: boolean;
  show_product: boolean;
};

export default function AdminProductsPage() {
  const t = useTranslations('admin.products');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Fetch all products on mount
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from<Product>('products')
        .select('id, name, price, in_stock, show_product');

      if (error) {
        console.error('Error fetching products:', error);
        setErrorMsg(t('errorLoad'));
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }
    fetchProducts();
  }, [t]);

  // Toggle show_product flag for a given product ID
  async function toggleShowProduct(productId: string, newValue: boolean) {
    // Optimistic UI update
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, show_product: newValue } : p
      )
    );

    const { error } = await supabase
      .from('products')
      .update({ show_product: newValue })
      .eq('id', productId);

    if (error) {
      console.error('Error updating show_product:', error);
      setErrorMsg(t('errorUpdate'));
      // Revert UI if it fails
      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, show_product: !newValue } : p
        )
      );
    }
  }

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  return (
    <div className={isRtl ? 'direction-rtl' : ''}>
      <h2 className="text-xl font-medium mb-4">{t('heading')}</h2>
      {errorMsg && (
        <p className="text-red-600 mb-4">{errorMsg}</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium">{t('columns.id')}</th>
              <th className="px-4 py-2 text-left text-sm font-medium">{t('columns.name')}</th>
              <th className="px-4 py-2 text-right text-sm font-medium">{t('columns.price')}</th>
              <th className="px-4 py-2 text-center text-sm font-medium">{t('columns.inStock')}</th>
              <th className="px-4 py-2 text-center text-sm font-medium">{t('columns.visible')}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{prod.id}</td>
                <td className="px-4 py-2 text-sm">{prod.name}</td>
                <td className="px-4 py-2 text-sm text-right">
                  ${prod.price.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  {prod.in_stock ? (
                    <span className="text-green-600">{t('yes')}</span>
                  ) : (
                    <span className="text-red-600">{t('no')}</span>
                  )}
                </td>
                <td className="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={prod.show_product}
                    onChange={() =>
                      toggleShowProduct(prod.id, !prod.show_product)
                    }
                    className="h-5 w-5 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  className="px-4 py-6 text-center text-sm text-gray-500"
                  colSpan={5}
                >
                  {t('noProducts')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

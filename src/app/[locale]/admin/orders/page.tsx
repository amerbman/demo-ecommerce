// app/[locale]/admin/orders/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useTranslations, useLocale } from 'next-intl';

type Order = {
  id: number;
  user_id: string;
  status: string;
  total: number;
  created_at: string;
};

export default function AdminOrdersPage() {
  const t = useTranslations('admin.orders');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      const { data, error } = await supabase
        .from<Order>('orders')
        .select('id, user_id, status, total, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        setErrorMsg(t('errorLoad'));
      } else {
        setOrders(data || []);
      }
      setLoading(false);
    }
    fetchOrders();
  }, [t]);

  if (loading) return <div>{t('loading')}</div>;

  return (
    <div className={isRtl ? 'direction-rtl' : ''}>
      <h2 className="text-xl font-medium mb-4">{t('heading')}</h2>
      {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium">
                {t('columns.orderId')}
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                {t('columns.userId')}
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                {t('columns.status')}
              </th>
              <th className="px-4 py-2 text-right text-sm font-medium">
                {t('columns.total')}
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                {t('columns.date')}
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord) => (
              <tr key={ord.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{ord.id}</td>
                <td className="px-4 py-2 text-sm">{ord.user_id}</td>
                <td className="px-4 py-2 text-sm">{ord.status}</td>
                <td className="px-4 py-2 text-sm text-right">
                  ${ord.total.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm">
                  {new Date(ord.created_at).toLocaleString(locale)}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  className="px-4 py-6 text-center text-sm text-gray-500"
                  colSpan={5}
                >
                  {t('noOrders')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

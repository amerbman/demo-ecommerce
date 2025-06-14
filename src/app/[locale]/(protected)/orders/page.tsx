// src/app/[locale]/(protected)/orders/page.tsx
import { createServerSupabaseClient } from '@/utils/supabase/server';
import Link from 'next/link';

type Props = { params: { locale: 'en' | 'ar' } };

// 1) Inline your translations
const translations = {
  en: {
    title: 'Your Orders',
    empty: 'You have no orders yet.',
    orderId: 'Order ID',
    date: 'Date',
    total: 'Total',
    items: 'Items',
    view: 'View',
  },
  ar: {
    title: 'طلباتي',
    empty: 'لا توجد طلبات بعد.',
    orderId: 'رقم الطلب',
    date: 'التاريخ',
    total: 'الإجمالي',
    items: 'العناصر',
    view: 'عرض',
  },
};

export default async function OrdersPage({ params: { locale } }: Props) {
  // 2) Pick the right language map
  const t = (key: keyof typeof translations['en']) =>
    translations[locale][key];

  // 3) Fetch user & orders
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main dir={locale === 'ar' ? 'rtl' : 'ltr'} className="p-8">
        <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
        <p>{t('empty')}</p>
      </main>
    );
  }

  const { data: orders } = await supabase
    .from('orders')
    .select('id, created_at, order_items(quantity, unit_price)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <main dir={locale === 'ar' ? 'rtl' : 'ltr'} className="p-8">
      <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>

      {orders?.length ? (
        <ul className="space-y-4">
          {orders.map((order) => {
            const total = order.order_items.reduce(
              (sum, i) => sum + i.quantity * i.unit_price,
              0
            );
            const count = order.order_items.reduce(
              (sum, i) => sum + i.quantity,
              0
            );
            return (
              <li key={order.id} className="border p-4 rounded shadow-sm">
                <p>
                  <strong>{t('orderId')}:</strong> {order.id}
                </p>
                <p>
                  <strong>{t('date')}:</strong>{' '}
                  {new Date(order.created_at).toLocaleDateString(locale)}
                </p>
                <p>
                  <strong>{t('total')}:</strong> {total.toFixed(2)} SAR
                </p>
                <p>
                  <strong>{t('items')}:</strong> {count}
                </p>
                <Link
                  href={`/${locale}/orders/${order.id}`}
                  className="mt-2 inline-block hover:underline"
                >
                  {t('view')}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>{t('empty')}</p>
      )}
    </main>
  );
}

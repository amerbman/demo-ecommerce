// File: src/app/[locale]/(protected)/orders/page.tsx

import { createServerSupabaseClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Metadata } from 'next'

interface OrdersPageProps {
  params: { locale: 'en' | 'ar' }
}

// Inline translations
const messages = {
  en: {
    title: 'My Orders',
    noOrders: 'No orders found.',
    orderId: 'Order #',
    date: 'Date',
    total: 'Total',
    items: 'Items',
    view: 'View',
  },
  ar: {
    title: 'طلباتي',
    noOrders: 'لا توجد طلبات.',
    orderId: 'الطلب رقم',
    date: 'التاريخ',
    total: 'الإجمالي',
    items: 'العناصر',
    view: 'عرض',
  },
}

// SSR metadata using translations
export async function generateMetadata({ params: { locale } }: OrdersPageProps): Promise<Metadata> {
  const t = (k: keyof typeof messages.en) => messages[locale][k]
  return { title: t('title') }
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { locale } = params
  const t = (k: keyof typeof messages.en) => messages[locale][k]

  const supabase = createServerSupabaseClient()

  // 1) Get session (ProtectedLayout already ensured it exists)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 2) Fetch orders + their items so we can compute totals
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      id,
      created_at,
      order_items (
        quantity,
        unit_price
      )
    `)
    .eq('user_id', session!.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  // 3) Compute total and item count for each
  const ordersWithTotals =
    orders?.map((o) => {
      const count = o.order_items.reduce((sum, i) => sum + i.quantity, 0)
      const total = o.order_items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0)
      return { ...o, count, total }
    }) || []

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>

      {ordersWithTotals.length > 0 ? (
        <ul className="space-y-4">
          {ordersWithTotals.map((order) => (
            <li key={order.id} className="border p-4 rounded">
              <p>
                <strong>{t('orderId')}</strong> {order.id}
              </p>
              <p>
                <strong>{t('date')}:</strong>{' '}
                {new Date(order.created_at).toLocaleDateString(locale)}
              </p>
              <p>
                <strong>{t('items')}:</strong> {order.count}
              </p>
              <p>
                <strong>{t('total')}:</strong> {order.total.toFixed(2)} SAR
              </p>
              <Link
                href={`/${locale}/orders/${order.id}`}
                className="mt-2 inline-block text-blue-600 hover:underline"
              >
                {t('view')}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>{t('noOrders')}</p>
      )}
    </main>
  )
}

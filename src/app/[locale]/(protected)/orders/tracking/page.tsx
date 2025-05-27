// File: src/app/[locale]/(protected)/orders/page.tsx
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { Metadata } from 'next'

interface OrdersPageProps {
  params: { locale: string }
}

export const metadata: Metadata = {
  title: 'My Orders',
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // (ProtectedLayout already redirected if no session)

  // Only select id and created_at—no `total` column assumed
  const { data: orders, error } = await supabase
    .from('orders')
    .select('id, created_at')
    .eq('user_id', session!.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders && orders.length > 0 ? (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded">
              <p>
                <strong>Order #</strong> {order.id}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </main>
  )
}

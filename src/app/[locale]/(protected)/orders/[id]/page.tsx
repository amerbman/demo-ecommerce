// src/app/[locale]/orders/[id]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { createServerSupabaseClient } from '@/utils/supabase/server'

type Props = {
  params: {
    locale: 'en' | 'ar'
    id: string
  }
}

const messages = {
  en: {
    title: 'Order Details',
    orderId: 'Order ID',
    date: 'Date',
    total: 'Total',
    items: 'Items',
    image: 'Image',
    product: 'Product',
    quantity: 'Quantity',
    price: 'Unit Price',
    back: 'Back to Orders',
    tracking: 'Tracking Information',
    trackingNumber: 'Tracking Number',
    status: 'Status',
    noTracking: 'No tracking info available.',
  },
  ar: {
    title: 'تفاصيل الطلب',
    orderId: 'رقم الطلب',
    date: 'التاريخ',
    total: 'الإجمالي',
    items: 'العناصر',
    image: 'صورة',
    product: 'المنتج',
    quantity: 'الكمية',
    price: 'سعر الوحدة',
    back: 'العودة للطلبات',
    tracking: 'معلومات التتبع',
    trackingNumber: 'رقم التتبع',
    status: 'الحالة',
    noTracking: 'لا توجد معلومات تتبع.',
  },
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = (k: keyof typeof messages.en) => messages[locale][k]
  return { title: t('title') }
}

export default async function OrderDetailsPage({ params: { locale, id } }: Props) {
  const t = (k: keyof typeof messages.en) => messages[locale][k]
  const supabase = createServerSupabaseClient()

  // Fetch order and tracking
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('id, created_at, tracking_number, shipment_status')
    .eq('id', id)
    .single()

  if (orderError || !order) {
    return (
      <main dir={locale === 'ar' ? 'rtl' : 'ltr'} className="p-8">
        <p className="text-red-500">{orderError?.message || 'Order not found'}</p>
        <Link href={`/${locale}/orders`} className="mt-4 inline-block hover:underline">
          {t('back')}
        </Link>
      </main>
    )
  }

  // Fetch items and products
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('quantity, unit_price, product_id')
    .eq('order_id', id)
  if (itemsError || !items) throw new Error(itemsError?.message || 'Could not load order items')

  const productIds = items.map((i) => i.product_id)
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('id, name, images')
    .in('id', productIds)
  if (productsError) throw new Error(productsError.message)

  const itemsWithData = items.map((item) => {
    const prod = products?.find((p) => p.id === item.product_id)
    const name = prod?.name ?? '–'
    const imgArray = Array.isArray(prod?.images) ? (prod.images as string[]) : []
    const image = imgArray[0] || '/images/placeholder.png'
    const lineTotal = item.quantity * item.unit_price
    return { ...item, name, image, lineTotal }
  })

  const grandTotal = itemsWithData.reduce((sum, i) => sum + i.lineTotal, 0)

  return (
    <main dir={locale === 'ar' ? 'rtl' : 'ltr'} className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">{t('title')}</h1>

      <div className="space-y-1">
        <p><strong>{t('orderId')}:</strong> {order.id}</p>
        <p><strong>{t('date')}:</strong> {new Date(order.created_at).toLocaleDateString(locale)}</p>
        <p><strong>{t('total')}:</strong> {grandTotal.toFixed(2)} SAR</p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t('tracking')}</h2>
        {order.tracking_number ? (
          <div className="space-y-1">
            <p><strong>{t('trackingNumber')}:</strong> {order.tracking_number}</p>
            <p><strong>{t('status')}:</strong> {order.shipment_status}</p>
          </div>
        ) : (
          <p className="italic">{t('noTracking')}</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t('items')}</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1">{t('image')}</th>
              <th className="border px-2 py-1">{t('product')}</th>
              <th className="border px-2 py-1">{t('quantity')}</th>
              <th className="border px-2 py-1">{t('price')}</th>
              <th className="border px-2 py-1">{t('total')}</th>
            </tr>
          </thead>
          <tbody>
            {itemsWithData.map((item, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="object-cover rounded"
                  />
                </td>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">{item.quantity}</td>
                <td className="border px-2 py-1">{item.unit_price.toFixed(2)}</td>
                <td className="border px-2 py-1">{item.lineTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Link href={`/${locale}/orders`} className="mt-4 inline-block text-blue-600 hover:underline">
        {t('back')}
      </Link>
    </main>
  )
}

// src/app/[locale]/(protected)/layout.tsx
export const dynamic = 'force-dynamic';
import Link from 'next/link'
import { ReactNode } from 'react'
import { createServerSupabaseClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'

interface Props {
  children: ReactNode
  params: { locale: 'en' | 'ar' }
}

export default async function ProtectedLayout({ children, params }: Props) {
  const { locale } = params

  // 1) session check
  const supabase = createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect(`/${locale}/auth/login`)
  }

  // 2) inline labels
  const labels: Record<'en' | 'ar', Record<string, string>> = {
    en: {
      account: 'Account',
      myOrders: 'My Orders',
      myAddresses: 'My Addresses',
      savedCards: 'Saved Cards',
      settings: 'Settings',
      logout: 'Logout',
    },
    ar: {
      account: 'الحساب',
      myOrders: 'طلباتي',
      myAddresses: 'عناويني',
      savedCards: 'بطاقاتي',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
    },
  }

  const t = labels[locale]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <nav className="p-6 space-y-4">
          <Link href={`/${locale}/account`} className="block text-gray-700 hover:text-blue-600">
            {t.account}
          </Link>
          <Link href={`/${locale}/orders`} className="block text-gray-700 hover:text-blue-600">
            {t.myOrders}
          </Link>
          <Link href={`/${locale}/addresses`} className="block text-gray-700 hover:text-blue-600">
            {t.myAddresses}
          </Link>
          <Link href={`/${locale}/cards`} className="block text-gray-700 hover:text-blue-600">
            {t.savedCards}
          </Link>
          <Link href={`/${locale}/settings`} className="block text-gray-700 hover:text-blue-600">
            {t.settings}
          </Link>
          <LogoutButton label={t.logout} />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}

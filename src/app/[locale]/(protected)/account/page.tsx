// File: src/app/[locale]/(protected)/account/page.tsx
'use client'

import { useSession } from '@supabase/auth-helpers-react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function AccountPage() {
  const { locale } = useParams() as { locale: string }
  const session = useSession()
  const router = useRouter()
  const t = useTranslations('accountPage')

  useEffect(() => {
    if (session === null) {
      router.push(`/${locale}/auth/login`)
    }
  }, [session, locale, router])

  // While checking for a session (or redirecting), show a loading state
  if (session === null) {
    return <p className="p-8">{t('loadingAccount')}</p>
  }

  // Session exists — render the account UI
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        {t('welcome')}, {session.user.email}!
      </h1>
      <ul className="space-y-2">
        <li>
          <Link href={`/${locale}/orders`} className="text-blue-600 hover:underline">
            {t('myOrders')}
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/orders/tracking`}
            className="text-blue-600 hover:underline"
          >
            {t('trackOrder')}
          </Link>
        </li>
      </ul>
    </main>
  )
}

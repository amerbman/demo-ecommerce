'use client'

import React, { ReactNode } from 'react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { NextIntlClientProvider } from 'next-intl'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'

interface ProvidersProps {
  children: ReactNode
  locale: string
  messages: Record<string, string>
}

export default function Providers({ children, locale, messages }: ProvidersProps) {
  const supabase = createBrowserSupabaseClient()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SessionContextProvider supabaseClient={supabase}>
        {children}
      </SessionContextProvider>
    </NextIntlClientProvider>
  )
}

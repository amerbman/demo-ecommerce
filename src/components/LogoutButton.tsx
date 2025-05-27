'use client'

import { useRouter, useParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface Props {
  label: string
}

export default function LogoutButton({ label }: Props) {
  const supabase = createClientComponentClient()
  const router = useRouter()
  const { locale } = useParams() as { locale: string }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push(`/${locale}/auth/login`)
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left mt-4 text-red-600 hover:underline"
    >
      {label}
    </button>
  )
}

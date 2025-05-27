// File: src/app/[locale]/auth/reset-password/page.tsx
'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'

export default function ResetPasswordPage() {
  const supabase = createBrowserSupabaseClient()
  const { locale } = useParams() as { locale: string }
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/${locale}/auth/update-password`
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>

      {success && <p className="text-green-600">Check your email for a reset link.</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          Send reset link
        </button>
      </form>
    </div>
  )
}

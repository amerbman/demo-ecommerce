// File: src/app/[locale]/auth/update-password/page.tsx
'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'

export default function UpdatePasswordPage() {
  const supabase = createBrowserSupabaseClient()
  const router = useRouter()
  const { locale } = useParams() as { locale: string }

  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setPassword('')
      setTimeout(() => router.push(`/${locale}/auth/login`), 2000)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Set New Password</h1>

      {success && <p className="text-green-600">Password updated. Redirecting...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  )
}

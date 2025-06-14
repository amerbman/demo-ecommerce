// File: src/app/[locale]/auth/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const supabase = createBrowserSupabaseClient()
  const router  = useRouter()
  const { locale } = useParams() as { locale: string }

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState<string | null>(null)
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)
    if (signInError) {
      setError(signInError.message)
    } else {
      router.push(`/${locale}/orders`)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Log In</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?{' '}
        <a
          href={`/${locale}/auth/register`}
          className="text-blue-600 hover:underline"
        >
          Sign up
        </a>
      </p>

      <p className="mt-2 text-center text-sm">
        <a
          href={`/${locale}/auth/reset-password`}
          className="text-blue-500 hover:underline"
        >
          Forgot your password?
        </a>
      </p>
    </div>
  )
}

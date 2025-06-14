'use client'

import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AuthForm from '@/components/AuthForm'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'

export default function RegisterPage() {
  const supabase = createBrowserSupabaseClient()
  const router  = useRouter()
  const { locale } = useParams() as { locale: string }

  const [error, setError]     = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (data: { email: string; password: string }) => {
    setError(null)
    setLoading(true)

    // 🔍 Debug logs
    console.log('Signing up against:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log(
      'Anon key present:',
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    )

    // 1️⃣ Sign up
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password
    })

    setLoading(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    // 2️⃣ Mirror into your `public.users` table
    if (signUpData.user?.id) {
      const { error: insertError } = await supabase
        .from('users')
        .insert({ id: signUpData.user.id, email: signUpData.user.email })
      if (insertError) {
        console.warn(
          'failed to insert into custom users table:',
          insertError.message
        )
      }
    }

    // 3️⃣ Redirect to login
    router.push(`/${locale}/auth/login`)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow rounded p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <AuthForm mode="register" onSubmit={handleRegister} />
        {loading && (
          <p className="mt-2 text-center text-gray-600">
            Creating your account…
          </p>
        )}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a
            href={`/${locale}/auth/login`}
            className="text-blue-600 hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  )
}

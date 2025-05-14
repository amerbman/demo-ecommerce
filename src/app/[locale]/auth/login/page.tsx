"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <AuthForm mode="login" onSubmit={handleLogin} />

        {loading && <p className="mt-2 text-center text-gray-600">Logging you in…</p>}

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-red-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

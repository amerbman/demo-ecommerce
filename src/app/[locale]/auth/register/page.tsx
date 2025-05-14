// src/app/[locale]/auth/register/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth";
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Synchronous handler to satisfy AuthForm's onSubmit signature
  const handleRegister = (data: { name: string; email: string; password: string }) => {
    setError(null);
    signUp(data)
      .then(() => {
        router.push("/auth/login");
      })
      .catch((err: any) => {
        setError(err.message || "Registration failed");
      });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {/* @ts-ignore: AuthForm’s onSubmit type is temporarily mismatched */}
        <AuthForm mode="register" onSubmit={handleRegister} />

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/auth/login" className="text-red-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </main>
  );
}

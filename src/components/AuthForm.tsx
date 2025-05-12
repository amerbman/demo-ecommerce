"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: { name?: string; email: string; password: string }) => void;
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const t = useTranslations("authForm");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ name: mode === "register" ? name : undefined, email, password });
      }}
      className="max-w-md mx-auto grid gap-4"
    >
      {mode === "register" && (
        <input
          type="text"
          placeholder={t("namePlaceholder")}
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-3 rounded"
          required
        />
      )}

      <input
        type="email"
        placeholder={t("emailPlaceholder")}
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-3 rounded"
        required
      />

      <input
        type="password"
        placeholder={t("passwordPlaceholder")}
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-3 rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
      >
        {mode === "login" ? t("loginButton") : t("registerButton")}
      </button>
    </form>
  );
}

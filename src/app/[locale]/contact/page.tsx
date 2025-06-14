"use client"
import { useState } from "react"
import { useTranslations } from "next-intl"

export default function ContactPage() {
  const t = useTranslations("Contact")
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(t("successMessage"))
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <main className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium">{t("nameLabel")}</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded p-2"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium">{t("emailLabel")}</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded p-2"
          />
        </div>

        <div>
          <label htmlFor="message" className="block font-medium">{t("messageLabel")}</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            className="mt-1 w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
        >
          {t("submitButton")}
        </button>
      </form>
    </main>
  )
}

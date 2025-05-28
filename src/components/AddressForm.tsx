// File: src/components/AddressForm.tsx
'use client'

import React, { FormEvent, useState, useEffect } from 'react'

export interface Address {
  id?: string
  full_name: string
  email: string
  street: string
  city: string
  postal_code: string
  country: string
}

interface AddressFormProps {
  initialData: Address | null
  onSave: (data: Address) => Promise<void>
  onCancel: () => void
}

export default function AddressForm({ initialData, onSave, onCancel }: AddressFormProps) {
  const [data, setData] = useState<Address>(
    initialData ?? { full_name: '', email: '', street: '', city: '', postal_code: '', country: '' }
  )
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (initialData) {
      setData(initialData)
    }
  }, [initialData])

  function handleChange<K extends keyof Address>(
    key: K,
    value: Address[K]
  ) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    await onSave(data)
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-gray-50 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          required
          placeholder="Full Name"
          value={data.full_name}
          onChange={(e) => handleChange('full_name', e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          required
          placeholder="Street Address"
          value={data.street}
          onChange={(e) => handleChange('street', e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          required
          placeholder="City"
          value={data.city}
          onChange={(e) => handleChange('city', e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          required
          placeholder="Postal Code"
          value={data.postal_code}
          onChange={(e) => handleChange('postal_code', e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          required
          placeholder="Country"
          value={data.country}
          onChange={(e) => handleChange('country', e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
)}
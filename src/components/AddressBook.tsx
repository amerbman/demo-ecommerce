// File: src/components/AddressBook.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import AddressForm, { Address as AddressType } from './AddressForm'

/**
 * Re-export AddressType so consumers can import Address from this module
 */
export type Address = AddressType

interface Props {
  /** Show radio-select UI when in checkout */
  checkoutMode?: boolean
  /** Fires when an address is selected (in checkout mode) */
  onSelect?: (address?: AddressType) => void
}

export default function AddressBook({ checkoutMode = false, onSelect }: Props) {
  const { locale } = useParams() as { locale: string }
  const [addresses, setAddresses] = useState<AddressType[]>([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState<AddressType | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)

  // Fetch addresses with credentials
  async function fetchAddresses() {
    setLoading(true)
    try {
      const res = await fetch(`/api/addresses`, {
        credentials: 'include',
        cache: 'no-store',
      })
      const json = await res.json()
      const list: AddressType[] = json.addresses || []
      setAddresses(list)
      if (checkoutMode && list.length) {
        setSelectedId(list[0].id)
        onSelect?.(list[0])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [locale])

  // Create or update
  async function saveAddress(data: Partial<AddressType> & { id?: string }) {
    const method = data.id ? 'PATCH' : 'POST'
    const res = await fetch(`/api/addresses`, {
      method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!res.ok) {
      alert(json.error)
    }
    await fetchAddresses()
    setEditing(null)
    setShowNew(false)
    if (checkoutMode) {
      const addr = (json.address as AddressType) || addresses[0]
      onSelect?.(addr)
    }
  }

  // Delete
  async function deleteAddress(id: string) {
    if (!confirm('Are you sure?')) return
    await fetch(`/api/addresses`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    await fetchAddresses()
    if (checkoutMode && selectedId === id) {
      setSelectedId(undefined)
      onSelect?.(undefined)
    }
  }

  if (loading) return <p>Loading…</p>

  return (
    <div className="space-y-4">
      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="border rounded p-4 flex justify-between items-center"
        >
          {checkoutMode ? (
            <label className="flex items-center">
              <input
                type="radio"
                name="address"
                checked={selectedId === addr.id}
                onChange={() => {
                  setSelectedId(addr.id)
                  onSelect?.(addr)
                }}
                className="mr-2"
              />
              <span>
                {addr.full_name}, {addr.street}, {addr.city}, {addr.country}
              </span>
            </label>
          ) : (
            <span>
              {addr.full_name}, {addr.street}, {addr.city}, {addr.country}
            </span>
          )}

          <div className="space-x-4 text-sm">
            <button
              onClick={() => setEditing(addr)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => addr.id && deleteAddress(addr.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Inline form for editing */}
      {editing && (
        <AddressForm
          locale={locale}
          initialData={editing}
          onSave={saveAddress}
          onCancel={() => setEditing(null)}
        />
      )}

      {/* Inline form for adding */}
      {!editing && showNew && (
        <AddressForm
          locale={locale}
          initialData={null}
          onSave={saveAddress}
          onCancel={() => setShowNew(false)}
        />
      )}

      <div className="flex gap-4">
        {!showNew && !editing && (
          <button
            onClick={() => setShowNew(true)}
            className="text-blue-600 hover:underline"
          >
            {checkoutMode ? 'Add New Address' : 'Add Address'}
          </button>
        )}
        {checkoutMode && (
          <Link
            href={`/${locale}/addresses`}
            className="text-gray-600 hover:underline ml-auto"
          >
            Manage Addresses
          </Link>
        )}
      </div>
    </div>
  )
}

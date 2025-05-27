// src/app/[locale]/(protected)/addresses/page.tsx
import AddressBook from '@/components/AddressBook'

export default function AddressesPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Addresses</h1>
      <AddressBook />   {/* full management mode */}
    </main>
  )
}

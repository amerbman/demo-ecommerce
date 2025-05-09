import Link from "next/link"

export default function SupportPage() {
  return (
    <main className="container mx-auto py-16 space-y-12">
      <h1 className="text-4xl font-bold">Support</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-medium">How can I track my order?</dt>
            <dd className="mt-1">Log in and visit My Orders → Track Order, then enter your order number.</dd>
          </div>
          <div>
            <dt className="font-medium">What is your return policy?</dt>
            <dd className="mt-1">You can return any unopened product within 30 days for a full refund.</dd>
          </div>
          {/* …more FAQs */}
        </dl>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Still need help?</h2>
        <p>
          Reach out to our support team via{' '}
          <Link href="/contact" className="text-red-600 hover:underline">
            Contact page
          </Link>.
        </p>
      </section>
    </main>
)
}

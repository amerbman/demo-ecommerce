export default function Confirmation({ searchParams }: { searchParams: { orderId?: string } }) {
    return (
      <main className="max-w-md mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
        <p>Your order reference is <strong>{searchParams.orderId}</strong></p>
        <p>We’ll email you updates shortly.</p>
      </main>
    );
  }
  
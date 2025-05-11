// src/app/account/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="p-8">Loading account…</p>;
  }
  if (!session) {
    return null;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {session.user?.name}!
      </h1>
      <ul className="space-y-2">
        <li>
          <Link href="/orders" className="text-blue-600 hover:underline">
            My Orders
          </Link>
        </li>
        <li>
          <Link href="/orders/tracking" className="text-blue-600 hover:underline">
            Track an Order
          </Link>
        </li>
      </ul>
    </main>
  );
}

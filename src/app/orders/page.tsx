"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import OrdersList from "@/components/OrdersList"; // we’ll stub this

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not signed in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading orders…</p>;
  if (!session) return null;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <OrdersList />
    </main>
  );
}

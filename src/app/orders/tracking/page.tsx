"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TrackingWidget from "@/components/TrackingWidget"; // stub this

export default function TrackingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading tracking…</p>;
  if (!session) return null;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
      <TrackingWidget />
    </main>
  );
}

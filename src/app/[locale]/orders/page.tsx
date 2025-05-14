"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import OrdersList from "@/components/OrdersList";

export default function OrdersPage() {
  const t = useTranslations("account");      // ← add this
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>{t("loading.orders")}</p>;
  if (!session) return null;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{t("my.orders")}</h1>
      <OrdersList />
    </main>
  );
}

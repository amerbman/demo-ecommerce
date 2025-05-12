
"use client";
import { useTranslations } from 'next-intl';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TrackingWidget from "@/components/TrackingWidget"; // stub this

export default function TrackingPage() {
  const t = useTranslations("Tracking");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>{t('loading')}</p>;
  if (!session) return null;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{t('trackOrder')}</h1>
      <TrackingWidget />
    </main>
  );
}

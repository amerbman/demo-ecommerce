
// src/app/account/page.tsx
"use client";
import { useTranslations } from 'next-intl';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AccountPage() {
  const t = useTranslations('accountPage');
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="p-8">{t('loadingAccount')}</p>;
  }
  if (!session) {
    return null;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        {t('welcome')}, {session.user?.name}!
      </h1>
      <ul className="space-y-2">
        <li>
          <Link href="/orders" className="text-blue-600 hover:underline">
            {t('myOrders')}
          </Link>
        </li>
        <li>
          <Link href="/orders/tracking" className="text-blue-600 hover:underline">
            {t('trackOrder')}
          </Link>
        </li>
      </ul>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function SupportPage() {
  const t = useTranslations("Support");
  const params = useParams();
  const locale = params.locale ?? "en";

  return (
    <main className="container mx-auto py-16 space-y-12">
      <h1 className="text-4xl font-bold">{t("support")}</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          {t("frequentlyAskedQuestions")}
        </h2>
        <dl className="space-y-6">
          <div>
            <dt className="font-medium">{t("howToTrackOrder")}</dt>
            <dd className="mt-1">{t("trackOrderInstructions")}</dd>
          </div>
          <div>
            <dt className="font-medium">{t("returnPolicy")}</dt>
            <dd className="mt-1">{t("returnPolicyDetails")}</dd>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t("needHelp")}</h2>
        <p>
          {t("contactSupport")} {" "}
          <Link href={`/${locale}/contact`} className="text-red-600 hover:underline">
            {t("contactPage")}
          </Link>
        </p>
      </section>
    </main>
  );
}

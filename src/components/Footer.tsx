// src/components/Footer.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhoneAlt, faEnvelope, faStore } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const { locale } = useParams() as { locale?: string };
  const isRtl = locale === "ar";

  return (
    <footer
      dir={isRtl ? "rtl" : "ltr"}
      className={[
        "bg-gray-900 text-gray-300 px-4 py-12",
        isRtl ? "text-right" : "text-left",
      ].join(" ")}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex items-center space-x-4">
          <Link href={`/${locale}`} className="flex items-center">
            <FontAwesomeIcon icon={faStore} className={`text-2xl text-red-600 ${isRtl ? 'ml-2' : 'mr-2'}`} />
            <span className="text-2xl font-bold text-white-800 gap-x-2">
            {t('market')}
          </span>
          </Link>
        </div>

        <div className="flex flex-col items-start">
          <h4 className="text-white font-semibold mb-4">{t("shop")}</h4>
          <ul className="space-y-2 text-gray-400">
            {["brooms", "brushes", "mops", "kits", "accessories"].map((key) => (
              <li key={key}>
                <Link
                  href={`/${locale}/${key === "brooms" ? "shop/brooms" : key}`}
                  className="hover:text-red-600"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start">
          <h4 className="text-white font-semibold mb-4">{t("support")}</h4>
          <ul className="space-y-2 text-gray-400">
            {["contactUs", "faqs", "shipping", "care", "warranty"].map((key) => (
              <li key={key}>
                <Link
                  href={`/${locale}/${key === "contactUs" ? "contact" : key}`}
                  className="hover:text-red-600"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start">
          <h4 className="text-white font-semibold mb-4">{t("contact")}</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-600 mr-2" />
              {t("address")}
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faPhoneAlt} className="text-red-600 mr-2" />
              {t("phone")}
            </li>
            <li className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-red-600 mr-2" />
              {t("email")}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 text-gray-500 text-xs sm:text-sm">
        {t("copyright")}
        <p className="mt-1">
          {t("developedByPrefix")}{" "}
          <Link
            href="https://amer-baosman.com/"
            className="relative inline-block text-gray-100 hover:text-red-500"
          >
            {t("developerName")}
          </Link>
        </p>
      </div>
    </footer>
  );
}
// components/WhyChoose.tsx
"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedal,
  faLeaf,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

const benefits = [
  { icon: faMedal, key: "premiumQuality" },
  { icon: faLeaf, key: "ecoFriendly" },
  { icon: faHeadset, key: "expertSupport" },
];

const WhyChoose: React.FC = () => {
  const t = useTranslations("whyChoose");

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-2">
          {t("heading")}
        </h2>
        <p className="text-gray-600 mb-10">
          {t("subheading")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <div
              key={b.key}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow text-center"
            >
              <FontAwesomeIcon
                icon={b.icon}
                className="text-red-600 text-4xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                {t(`benefits.${b.key}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`benefits.${b.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;

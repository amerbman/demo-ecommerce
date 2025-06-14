// components/JoinCommunity.tsx
"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

const JoinCommunity: React.FC = () => {
  const t = useTranslations("joinCommunity");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up your API / mailing list here
    console.log("submitting", email);
    setEmail("");
    alert(t("alert"));
  };

  return (
    <section className="bg-red-700 text-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
          {t("heading")}
        </h2>
        <p className="mb-8">
          {t("description")}
        </p>
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            required
            placeholder={t("placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:flex-1 px-4 py-3 rounded-md text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-white text-red-800 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            {t("button")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default JoinCommunity;

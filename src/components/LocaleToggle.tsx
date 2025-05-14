"use client";

import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

/**
 * A language switcher that toggles between 'en' and 'ar' by rewriting the URL prefix.
 * Preserves any existing query parameters.
 */
export default function LocaleToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine current and next locale
  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";
  const nextLocale = currentLocale === "en" ? "ar" : "en";

  // Construct new path by replacing or prefixing locale
  const newPath = pathname.startsWith(`/${currentLocale}`)
    ? pathname.replace(`/${currentLocale}`, `/${nextLocale}`)
    : `/${nextLocale}${pathname}`;

  // Reattach any query params
  const queryString = searchParams.toString();
  const href = queryString ? `${newPath}?${queryString}` : newPath;

  return (
    <button
      onClick={() => router.push(href)}
      className="px-3 py-1 border rounded hover:bg-gray-100"
    >
      {currentLocale === "en" ? "عربي" : "English"}
    </button>
  );
}

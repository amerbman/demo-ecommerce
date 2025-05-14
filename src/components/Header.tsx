"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import LogoFlora from "./LogoFlora";
import LogoFlosoft from "./LogoFlosoft";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import AuthForm from "@/components/AuthForm";
import { useTranslations } from "next-intl";

// Load LocaleToggle only on client to avoid SSR mismatch
const LocaleToggle = dynamic(() => import("@/components/LocaleToggle"), { ssr: false });

const navItems = [
  { key: "home",    path: "" },
  { key: "shop",    path: "shop" },
  { key: "about",   path: "about" },
  { key: "contact", path: "contact" },
  { key: "support", path: "support" },
];

export default function Header() {
  const t = useTranslations();
  const { data: session, status } = useSession();
  const { locale } = useParams();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const openLogin = () => {
    setLoginError(null);
    setShowLoginModal(true);
    setProfileMenuOpen(false);
  };
  const closeLogin = () => setShowLoginModal(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoginError(null);
    setLoadingLogin(true);
    const res = await signIn("credentials", { redirect: false, ...data });
    setLoadingLogin(false);
    if (res?.error) {
      setLoginError(t("auth.invalidCredentials"));
    } else {
      closeLogin();
      router.refresh();
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-24">
          {/* Logos */}
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center space-x-2">
              <LogoFlora />
              <LogoFlosoft />
            </div>
            <div className="flex items-center justify-center space-x-1 text-gray-600 text-xs">
              <span>{t("header.soldBy")}</span>
              <a
                href="https://ssbte.net"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600"
              >
                <Image src="/assets/ssbte_logo.svg" alt="SSBTE Logo" width={48} height={48} />
              </a>
            </div>
          </div>

          {/* Desktop nav + profile + cart + language toggle */}
          <div className="hidden md:flex items-center gap-x-6">
            {navItems.map(({ key, path }) => (
              <Link
                key={key}
                href={`/${locale}/${path}`}
                className="text-gray-700 hover:text-red-600 font-medium transition"
              >
                {t(`navbar.${key}`)}
              </Link>
            ))}

            {/* Profile icon, greeting & menu */}
            <div className="relative inline-block" ref={profileRef}>
              <button
                onClick={() => setProfileMenuOpen(o => !o)}
                className="text-gray-700 hover:text-red-600 flex items-center"
              >
                <FontAwesomeIcon icon={faUser} className="text-2xl" />
                {status === "authenticated" && (
                  <span className="ml-2 text-gray-700">
                    {t("header.hello")}, {session.user?.name}
                  </span>
                )}
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                  {status === "authenticated" && (
                    <Link
                      href="/account"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {t("header.myAccount")}
                    </Link>
                  )}
                  {status === "authenticated" && (
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {t("header.logout")}
                    </button>
                  )}
                  {status === "unauthenticated" && (
                    <button
                      onClick={openLogin}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {t("header.login")}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Cart at end */}
            <button className="relative inline-flex items-center text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-medium">
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              {t("header.cart")}
              <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Language toggle below cart */}
            <LocaleToggle />
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden text-gray-700 hover:text-red-600"
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="md:hidden p-4 space-y-2 bg-white shadow-lg">
            {navItems.map(({ key, path }) => (
              <Link
                key={key}
                href={`/${locale}/${path}`}
                className="block text-gray-700 hover:text-red-600 font-medium transition"
              >
                {t(`navbar.${key}`)}
              </Link>
            ))}
            <div className="border-t mt-2 pt-2" />
            {status === "loading" ? null : session ? (
              <>
                <span className="block text-gray-700">
                  {t("header.hello")}, {session.user?.name}
                </span>
                <Link
                  href={`/${locale}/account`}
                  className="block text-gray-700 hover:text-red-600 font-medium"
                >
                  {t("header.myAccount")}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block text-gray-700 hover:text-red-600 font-medium"
                >
                  {t("header.logout")}
                </button>
              </>
            ) : (
              <button
                onClick={openLogin}
                className="block text-gray-700 hover:text-red-600 font-medium"
              >
                {t("header.login")}
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={closeLogin}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">
              {t("auth.loginTitle")}
            </h2>
            {loginError && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {loginError}
              </div>
            )}
            <AuthForm mode="login" onSubmit={handleLogin} />
            {loadingLogin && (
              <p className="mt-2 text-gray-600 text-center">
                {t("auth.loggingIn")}
              </p>
            )}
            <p className="mt-4 text-sm text-gray-600 text-center">
              {t("auth.noAccount")} <Link href="/auth/register" className="text-red-600 hover:underline">{t("auth.register")}</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
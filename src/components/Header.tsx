'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faUser, faStore } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';
import { useCart } from '@/context/CartContext';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

const LocaleToggle = dynamic(() => import('@/components/LocaleToggle'), { ssr: false });
const navItems = [
  { key: 'home', path: '' },
  { key: 'shop', path: 'shop' },
  { key: 'about', path: 'about' },
  { key: 'contact', path: 'contact' },
  { key: 'support', path: 'support' },
];

export default function Header() {
  const t = useTranslations();
  const { locale } = useParams() as { locale?: string };
  const isRtl = locale === 'ar';
  const router = useRouter();
  const { totalQuantity, clearCart } = useCart();
  const supabase = useSupabaseClient();
  const user = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav dir={isRtl ? 'rtl' : 'ltr'} className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-24">

        {/* Brand */}
        <Link href={`/${locale}`} className="flex items-center">
          <FontAwesomeIcon
            icon={faStore}
            className={`text-2xl text-red-600 ${isRtl ? 'ml-2' : 'mr-2'}`}
          />
          <span className="text-2xl font-bold text-gray-800">
            {t('header.market')}
          </span>
        </Link>

        {/* Nav Group */}
        <div
                className={
                  `flex items-center gap-x-6 ` +
                  (isRtl ? 'mr-auto' : 'ml-auto')
                }
>
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-x-6 rtl:space-x-reverse">
            {navItems.map(({ key, path }) => (
              <Link
                key={key}
                href={`/${locale}/${path}`}
                className="text-gray-700 hover:text-red-600 font-medium transition"
              >
                {t(`navbar.${key}`)}
              </Link>
            ))}
          </div>

          {/* Profile Menu */}
          <div className="relative gap-x-6 rtl:space-x-reverse" ref={profileRef}>
            <button
              onClick={() => setProfileMenuOpen(o => !o)}
              className="flex items-center text-gray-700 hover:text-red-600"
            >
              <FontAwesomeIcon icon={faUser} className="text-2xl" />
              {user && <span className={isRtl ? 'mr-2' : 'ml-2'}>{t('header.hello')}, {user.email}</span>}
            </button>
            {profileMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                {user ? (
                  <>  
                    <Link href={`/${locale}/account`} className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                      {t('header.myAccount')}
                    </Link>
                    <button
                      onClick={async () => {
                        await supabase.auth.signOut();
                        clearCart();
                        router.push(`/${locale}`);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      {t('header.logout')}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => router.push(`/${locale}/auth/login`)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    {t('header.login')}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={() => router.push(`/${locale}/cart`)}
            className="relative flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            {t('header.cart')}
            <span className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
              {totalQuantity}
            </span>
          </button>

          {/* Locale Toggle */}
          <LocaleToggle />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden ml-2 text-gray-700 hover:text-red-600"
          >
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Panel */}
      {mobileOpen && (
        <div className="md:hidden bg-white p-4 space-y-2 shadow-lg">
          {navItems.map(({ key, path }) => (
            <Link
              key={key}
              href={`/${locale}/${path}`}
              className="block text-gray-700 hover:text-red-600 font-medium"
            >
              {t(`navbar.${key}`)}
            </Link>
          ))}
          <div className="border-t mt-2 pt-2" />
          {user ? (
            <>
              <span className="block mb-2">{t('header.hello')}, {user.email}</span>
              <Link href={`/${locale}/account`} className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                {t('header.myAccount')}
              </Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push(`/${locale}`);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                {t('header.logout')}
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push(`/\${locale}/auth/login`)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              {t('header.login')}
            </button>
          )}
        </div>
      )}
    </nav>
  );
}



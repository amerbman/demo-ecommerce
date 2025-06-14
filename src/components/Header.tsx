'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import LogoFlora from './LogoFlora';
import LogoFlosoft from './LogoFlosoft';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
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
  const { totalQuantity } = useCart();

  const supabase = useSupabaseClient();
  const user = useUser();
  const { clearCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <>
      <nav dir={isRtl ? 'rtl' : 'ltr'} className="bg-white shadow-md sticky top-0 z-50">
        <div
          className={[
            'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-between items-center h-24',
            isRtl ? 'flex flex-row-reverse' : 'flex flex-row',
          ].join(' ')}
        >
          {/* Logos */}
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center space-x-2">
              <LogoFlora />
              <LogoFlosoft />
            </div>
            <div className="flex items-center justify-center space-x-1 text-gray-600 text-xs">
              <span>{t('header.soldBy')}</span>
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

            {/* Profile icon & menu */}
            <div className="relative inline-block" ref={profileRef}>
              <button
                onClick={() => setProfileMenuOpen((o) => !o)}
                className="text-gray-700 hover:text-red-600 flex items-center"
              >
                <FontAwesomeIcon icon={faUser} className="text-2xl" />
                {user && (
                  <span className={isRtl ? 'mr-2' : 'ml-2'}>
                    {t('header.hello')}, {user.email}
                  </span>
                )}
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                  {user && (
                    <Link
                      href={`/${locale}/account`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {t('header.myAccount')}
                    </Link>
                  )}
                  {user ? (
                    <button
                      onClick={async () => {
                        await supabase.auth.signOut();
                        clearCart();
                        router.push(`/${locale}`);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {t('header.logout')}
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push(`/${locale}/auth/login`)}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {t('header.login')}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={() => router.push(`/${locale}/cart`)}
              className="relative inline-flex items-center text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-medium"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              {t('header.cart')}
              <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            </button>

            {/* Language toggle */}
            <LocaleToggle />
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
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
            {user ? (
              <>
                <span className="block">
                  {t('header.hello')}, {user.email}
                </span>
                <Link
                  href={`/${locale}/account`}
                  className="block text-gray-700 hover:text-red-600 font-medium"
                >
                  {t('header.myAccount')}
                </Link>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    router.push(`/${locale}`);
                  }}
                  className="block text-gray-700 hover:text-red-600 font-medium"
                >
                  {t('header.logout')}
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push(`/${locale}/auth/login`)}
                className="block text-gray-700 hover:text-red-600 font-medium"
              >
                {t('header.login')}
              </button>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import LogoFlora from "./LogoFlora";
import LogoFlosoft from "./LogoFlosoft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

const Footer: React.FC = () => {
  const t = useTranslations("footer");
  const params = useParams();
  const locale = params.locale ?? "en";

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Left Side: Logos and Distributor Info */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <LogoFlora />
            <LogoFlosoft />
          </div>
          <div className="text-gray-400 text-sm text-center w-full">
            {t("soldBy")}
            <a
              href="https://ssbte.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block ml-1 hover:text-red-600"
            >
              <Image
                src="/assets/ssbte_logo.svg"
                alt={t("ssbteLogoAlt")}
                width={40}
                height={40}
                className="inline-block"
              />
            </a>
          </div>
        </div>

        {/* Shop links */}
        <div className="flex flex-col items-start">
          <h4 className="text-white font-semibold mb-4">{t("shop")}</h4>
          <ul className="space-y-2 text-gray-400 text-left">
            <li>
              <Link href={`/${locale}/shop/brooms`} className="hover:text-red-600">
                {t("brooms")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/shop/brushes`} className="hover:text-red-600">
                {t("brushes")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/shop/mops`} className="hover:text-red-600">
                {t("mops")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/shop/kits`} className="hover:text-red-600">
                {t("kits")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/shop/accessories`} className="hover:text-red-600">
                {t("accessories")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Support links */}
        <div className="flex flex-col items-start">
          <h4 className="text-white font-semibold mb-4">{t("support")}</h4>
          <ul className="space-y-2 text-gray-400 text-left">
            <li>
              <Link href={`/${locale}/contact`} className="hover:text-red-600">
                {t("contactUs")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/faqs`} className="hover:text-red-600">
                {t("faqs")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/shipping`} className="hover:text-red-600">
                {t("shipping")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/care`} className="hover:text-red-600">
                {t("care")}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/warranty`} className="hover:text-red-600">
                {t("warranty")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-start">
          <h4 className="text-white font-semibold mb-4">{t("contact")}</h4>
          <ul className="space-y-2 text-gray-400 text-left">
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

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-xs sm:text-sm">
        {t("copyright")}
        <p className="mt-1">
          {t("developedByPrefix")} {" "}
          <a
            href="https://amer-baosman.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block text-gray-100 transition duration-300 ease-in-out hover:text-red-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-500 hover:after:w-full after:transition-all after:duration-500"
          >
            {t("developerName")}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
// components/Footer.tsx
"use client";

import React from "react";
import Image from "next/image";
import LogoFlora from "./LogoFlora";
import LogoFlosoft from "./LogoFlosoft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => (
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
          Sold and Distributed by SSBTE
          <a
            href="https://ssbte.net"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block ml-1 hover:text-red-600"
          >
            <Image
              src="/assets/ssbte_logo.svg"
              alt="SSBTE Logo"
              width={40}
              height={40}
              className="inline-block"
            />
          </a>
        </div>
      </div>

      {/* Shop links */}
      <div className="flex flex-col items-start">
        <h4 className="text-white font-semibold mb-4">Shop</h4>
        <ul className="space-y-2 text-gray-400 text-left">
          <li><a href="/shop/brooms" className="hover:text-red-600">Brooms</a></li>
          <li><a href="/shop/brushes" className="hover:text-red-600">Brushes</a></li>
          <li><a href="/shop/mops" className="hover:text-red-600">Mops</a></li>
          <li><a href="/shop/kits" className="hover:text-red-600">Cleaning Kits</a></li>
          <li><a href="/shop/accessories" className="hover:text-red-600">Accessories</a></li>
        </ul>
      </div>

      {/* Support links */}
      <div className="flex flex-col items-start">
        <h4 className="text-white font-semibold mb-4">Support</h4>
        <ul className="space-y-2 text-gray-400 text-left">
          <li><a href="/contact" className="hover:text-red-600">Contact Us</a></li>
          <li><a href="/faqs" className="hover:text-red-600">FAQs</a></li>
          <li><a href="/shipping" className="hover:text-red-600">Shipping & Returns</a></li>
          <li><a href="/care" className="hover:text-red-600">Product Care</a></li>
          <li><a href="/warranty" className="hover:text-red-600">Warranty</a></li>
        </ul>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col items-start">
        <h4 className="text-white font-semibold mb-4">Contact</h4>
        <ul className="space-y-2 text-gray-400 text-left">
          <li className="flex items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-600 mr-2" />
            123 Clean Street, San Francisco
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon icon={faPhoneAlt} className="text-red-600 mr-2" />
            (800) 123-4567
          </li>
          <li className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-red-600 mr-2" />
            hello@cleantoolspro.com
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-xs sm:text-sm">
      © 2025 SALEH SAEED BAOTHMAN TRDE. All rights reserved.
      <p className="mt-1">
        Developed by{" "}
        <a
          href="https://amer-baosman.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block text-gray-100 transition duration-300 ease-in-out hover:text-red-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-red-500 hover:after:w-full after:transition-all after:duration-500"
        >
          Amer Baosman
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;

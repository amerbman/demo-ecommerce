"use client";

import React, { useState } from 'react';
import LogoFlora from './LogoFlora';
import LogoFlosoft from './LogoFlosoft';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-24">
        {/* Left Side: Logos and Distributor Info */}
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-2">
            <LogoFlora />
            <LogoFlosoft />
          </div>
          <div className="flex items-center justify-center space-x-1 text-gray-600 text-xs whitespace-nowrap">
            <span>Sold and Distributed by SSBTE</span>
            <a
              href="https://ssbte.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600"
            >
              <Image
                src="/assets/ssbte_logo.svg"
                alt="SSBTE Logo"
                width={48}
                height={48}
                className="inline-block w-12 h-12"
              />
            </a>
          </div>
        </div>

        {/* Right Side: Navigation and Cart */}
        <div className="flex items-center space-x-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['Home', 'Shop', 'Categories', 'About', 'Contact'].map(item => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-red-600 font-medium transition"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Cart Button */}
          <button className="relative inline-flex items-center text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-medium">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            Cart
            <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="md:hidden text-gray-700 hover:text-red-600">
            <FontAwesomeIcon icon={faBars} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md rounded-md mt-2 absolute right-4 top-20 z-50 p-4 space-y-2">
          {['Home', 'Shop', 'Categories', 'About', 'Contact'].map(item => (
            <a
              key={item}
              href="#"
              className="block text-gray-700 hover:text-red-600 font-medium transition"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Header;

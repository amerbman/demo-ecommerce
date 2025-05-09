// src/app/components/BrandInfo.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";

interface BrandInfoProps {
  brand: string;
  description: string;
  bgImage: string;
}

export default function BrandInfo({ brand, description, bgImage }: BrandInfoProps) {
  return (
    <div
      className="relative w-screen max-w-none h-20 sm:h-24 my-8"
      style={{
        perspective: 800,
        // pull to the very left edge of the screen:
        marginLeft: 'calc(50% - 50vw)',
        // span full viewport width but leave 180px gap on the right:
        width: 'calc(100vw - 180px)',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={brand}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
          className="absolute inset-0 rounded-lg overflow-hidden"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />

          {/* Overlay */}
          <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-50">
            <p className="px-4 text-center text-white text-base sm:text-lg md:text-xl font-medium">
              {description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

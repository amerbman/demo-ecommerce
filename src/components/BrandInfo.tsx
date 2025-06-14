"use client";

import { AnimatePresence, motion } from "framer-motion";

interface BrandInfoProps {
  brand: string;
  description: string;
  bannerImage: string;
}

export default function BrandInfo({ brand, description, bannerImage }: BrandInfoProps) {
  return (
    <div className="relative my-8 h-20 sm:h-24 overflow-hidden" style={{ perspective: 800 }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={brand}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
          className="absolute top-0 left-0 h-full w-[calc(100%_+_2rem)] -mx-4 sm:w-[calc(100%_+_3rem)] sm:-mx-6 lg:w-[calc(100%_+_4rem)] lg:-mx-8 rounded-lg overflow-hidden"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-center"
            style={{ 
              backgroundImage: `url(${bannerImage})`, 
              backgroundSize: '50%',  
              backgroundPosition: 'center'
            }}
          />
          
          {/* Overlay */}
          <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-30">
            <p className="px-4 text-center text-white text-base sm:text-lg md:text-xl font-medium">
              {description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
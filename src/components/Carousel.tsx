// src/app/components/Carousel.tsx
"use client";

import React from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface CarouselProps {
  images: string[];
  altText: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, altText }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <ResponsiveCarousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay
        emulateTouch
        className="rounded-md overflow-hidden"
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          const dotClass = isSelected
            ? "w-3 h-3 rounded-full bg-dotActive opacity-100 transition duration-300 ease-in-out"
            : "w-3 h-3 rounded-full bg-dotInactive opacity-50 transition duration-300 ease-in-out hover:bg-dotHover";
          return (
            <li
              className={`inline-block mx-1 cursor-pointer ${dotClass}`}
              onClick={onClickHandler}
              key={index}
              title={label}
            />
          );
        }}
      >
        {images.map((src, index) => (
          <div key={index} className="flex items-center justify-center bg-white">
            <img
              src={src}
              alt={`${altText} - ${index + 1}`}
              loading="lazy"
              className="w-full h-60 object-contain rounded-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/placeholder.jpg";
              }}
            />
          </div>
        ))}
      </ResponsiveCarousel>
    </div>
  );
};

export default Carousel;

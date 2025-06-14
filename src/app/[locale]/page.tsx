
"use client";

import Hero from "@/components/Hero";
import ShopByCategory from "@/components/ShopByCategory";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChoose from "@/components/WhyChoose";
import JoinCommunity from "@/components/JoinCommunity";

export default function HomePage() {
 
  return (
    <main>
      <Hero />
      <ShopByCategory />
      <FeaturedProducts />
      <WhyChoose />
      <JoinCommunity />
    </main>
  );
}

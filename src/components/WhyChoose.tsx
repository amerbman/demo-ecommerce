// components/WhyChoose.tsx
"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMedal,
  faLeaf,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const benefits = [
  {
    icon: faMedal,
    title: "Premium Quality",
    description:
      "Our products are made with durable materials designed to last longer than standard cleaning tools.",
  },
  {
    icon: faLeaf,
    title: "Eco-Friendly",
    description:
      "We prioritize sustainable materials and manufacturing processes to reduce environmental impact.",
  },
  {
    icon: faHeadset,
    title: "Expert Support",
    description:
      "Our cleaning experts are available to help you choose the right tools for your specific needs.",
  },
];

const WhyChoose: React.FC = () => (
  <section className="bg-gray-50 py-16">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl lg:text-4xl font-extrabold mb-2">
        Why Choose Us?
      </h2>
      <p className="text-gray-600 mb-10">
        We’re committed to providing the highest quality cleaning tools
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-shadow text-center"
          >
            <FontAwesomeIcon
              icon={b.icon}
              className="text-red-600 text-4xl mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
            <p className="text-gray-600">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChoose;

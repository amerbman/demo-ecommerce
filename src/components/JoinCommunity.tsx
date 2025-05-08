// components/JoinCommunity.tsx
"use client";

import React, { useState } from "react";

const JoinCommunity: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up your API / mailing list here
    console.log("submitting", email);
    setEmail("");
    alert("Thanks for subscribing!");
  };

  return (
    <section className="bg-red-700 text-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
          Join Our Cleaning Community
        </h2>
        <p className="mb-8">
          Subscribe to our newsletter for cleaning tips, exclusive offers, and new product announcements.
        </p>
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:flex-1 px-4 py-3 rounded-md text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default JoinCommunity;

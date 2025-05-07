import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="hero-image relative h-96 flex items-center justify-center">
            <div className="text-black text-center">
                <h1 className="text-4xl font-bold mb-4">Effortless Cleaning Starts Here</h1>
                <p className="text-lg mb-6">Discover our best cleaning products and deals!</p>
                <button className="bg-primary px-4 py-2 rounded-md hover:bg-secondary transition">
                    Shop Now
                </button>
            </div>
        </section>
    );
};

export default Hero;

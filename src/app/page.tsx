import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import ShopByCategory from '../components/ShopByCategory';
import WhyChoose from '@/components/WhyChoose';
import JoinCommunity from '@/components/JoinCommunity';

const HomePage: React.FC = () => {
    return (
        <main>
            <Hero />
            <ShopByCategory />
            <FeaturedProducts />
            <WhyChoose />
            <JoinCommunity />
        </main>
    );
};

export default HomePage;

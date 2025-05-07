import React from 'react';
import Image from 'next/image';

const LogoFlosoft: React.FC = () => {
    return (
        <div className="flex items-center">
            <Image 
                src="/assets/flosoft_logo.jpg" 
                alt="Flosoft Logo" 
                width={150} 
                height={150} 
                // className="rounded-full"
            />
        </div>
    );
};

export default LogoFlosoft;

import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => {
    return (
        <div className="flex items-center">
            <Image 
                src="/assets/flora_logo.png" 
                alt="Flora Logo" 
                width={150} 
                height={150} 
                // className="rounded-full"
            />
        </div>
    );
};

export default Logo;

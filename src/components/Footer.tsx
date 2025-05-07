import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark text-black py-8">
            <div className="text-center">
                <p>© 2023 Flora. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-instagram"></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

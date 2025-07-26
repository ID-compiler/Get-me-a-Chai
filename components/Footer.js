import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white fixed bottom-0 left-0 w-full px-4 py-3 text-sm z-50">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8">
        <p className="text-center">
          &copy; {currentYear} Get me A Chai — All rights reserved!
        </p>
        <p className="text-center">
          Made with ❤️ by ID
        </p>
      </div>
    </footer>
  );
};

export default Footer;

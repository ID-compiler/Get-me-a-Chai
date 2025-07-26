import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
   <footer className="bg-gray-900 text-white w-full px-4 py-3 flex flex-col items-center space-y-1 text-sm">
  <p className="text-center">
    &copy; {new Date().getFullYear()} Get me A Chai - All rights reserved!
  </p>
  <p className="text-center text-xs flex items-center gap-1">
    Made with
    <img src="/heart_icon.svg" alt="heart" className="w-4 h-4 inline-block" />
    by ID
  </p>
</footer>

  )
}

export default Footer

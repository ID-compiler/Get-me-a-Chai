import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=' bg-gray-900 text-white fixed bottom-[1px] w-screen px-[5px] pt-[12px] pb-[10px]' >
        <p className='text-center'>Copyright &copy; {currentYear} Get me A Chai - All rights reserved!</p>
    </footer>
  )
}

export default Footer

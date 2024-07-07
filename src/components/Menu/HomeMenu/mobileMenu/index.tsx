"use client";

import HamburgerMenuIcon from '@/icons/HamburgerMenu';
import arrayNavbarMenu from '@/utils/arrayMenu/arrayNavbarMenu';
import Link from 'next/link';
import { useState } from 'react';

const MobileMenu = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleMenuMobile = () => {
    setShowMobileMenu(!showMobileMenu)
  }
  return (
    <>
      <button type="button" onClick={handleMenuMobile}>
        <HamburgerMenuIcon className='h-6 w-6' />
      </button>

      <div className={`absolute h-[90vh] w-full top-16 pt-8 md:hidden flex flex-col justify-start items-center gap-5 bg-black/90 backdrop-blur text-white text-lg transition-left duration-500 ease ${showMobileMenu ? '-left-[100%]' : 'left-0'}`}>
        {arrayNavbarMenu.map((item, index) => (
          <button onClick={handleMenuMobile} key={index}>
            <Link
              href={item.path}
              className="p-2 rounded-full cursor-pointer hover:bg-custom-secondary font-semibold ">
              {item.name}
            </Link>
          </button>
        ))}
      </div>
    </>
  )
}
export default MobileMenu
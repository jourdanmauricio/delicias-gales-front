"use client";
import { usePathname } from 'next/navigation'
import ArrowLeftIcon from '@/icons/arrowLeft';
import ArrowRightIcon from '@/icons/arrowRight';
import Link from 'next/link';
import { useState } from 'react';
import { useUserStore } from '@/store/user.store';
import menuRole from '@/utils/arrayMenu/menuRoles';

const DashboardSidebar = () => {
  const [minItems, setMinItems] = useState(false);
  const user = useUserStore(state => state.user)
  const pathname = usePathname()

  const handleMinItems = () => {
    setMinItems(!minItems);
  };

  return (
    <div
      className={`mt-16 min-h-full hidden sm:inline-block left-0 bg-slate-100 overflow-x-hidden whitespace-nowrap transition-width text-gray-900 shadow-2xl ${minItems ? 'w-56' : 'w-12'}`}
    >
      <button
        onClick={handleMinItems}
        className="py-4 w-full hover:text-purple-500 text-xl"
      >
        {minItems ? (
          <ArrowLeftIcon className="m-auto w-6 h-6" />
        ) : (
          <ArrowRightIcon className="m-auto  w-6 h-6" />
        )}
      </button>

      <hr className="mb-4 border-b border-solid border-gray-700" />

      {user && menuRole[user.role].map((link) =>

        <Link
          key={link.id}
          href={link.href}
          className={`py-2 pl-2 pr-[14px] no-underline text-lg block text-left hover:text-purple-500 ${pathname === link.href ? 'text-purple-500' : ''} `
          }
        >
          <link.icon className="mr-4 inline-block w-6 h-6" />
          <span className="align-middle">{link.name}</span>
        </Link>

      )}
    </div>
  )
}
export default DashboardSidebar
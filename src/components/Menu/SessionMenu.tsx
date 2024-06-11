"use client";

import { HandleLogout } from '@/actions/auth';
import { Role } from '@/utils/types/users/usersRoles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const SessionMenu = ({ userSession }) => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuRef]);

  const handleClick = () => {
    setShowMenu(!showMenu)
  }

  const handleLogout = () => {
    HandleLogout();
    router.push("/");
  }

  return (
    <div className='relative'>
      <button onClick={handleClick} ref={menuRef} className="flex h-10 w-10 items-center justify-center rounded-full bg-custom-primary text-custom-secondary">
        {userSession.name.slice(0, 1)}
      </button>
      {showMenu &&
        <div className='absolute top-12 -left-12 bg-slate-50 text-slate-900 rounded'>
          <div className='pt-2 pb-1 px-4 w-full hover:bg-slate-300'>
            <Link href="/profile">Perfil</Link>
          </div>
          {userSession.role === Role.CUSTOMER ? (
            <button className='pt-2 pb-1 px-4 w-full hover:bg-slate-300 whitespace-nowrap'>Mis pedidos</button>
          ) :
            <button className='pt-2 pb-1 px-4 w-full hover:bg-slate-300 whitespace-nowrap'>Dashboard</button>
          }
          <button onClick={handleLogout} className='pb-2 pt-1 px-4 w-full hover:bg-slate-300'>Logout</button>
        </div>

      }
    </div>
  )
}
export default SessionMenu
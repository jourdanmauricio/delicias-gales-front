"use client";

import { HandleLogout } from "@/actions/auth";
import { useProductStore } from "@/store/product.store";
import { useShopCartStore } from "@/store/shopCart.store";
import { initialProd } from "@/utils/constants";
import { Role } from "@/utils/types/users/usersRoles";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SessionMenu = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const menuRef = useRef<HTMLButtonElement>(null);

  const removeProducts = useShopCartStore((state) => state.removeProducts);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuRef]);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    removeProducts();
    HandleLogout();
    router.push("/");
  };

  return (
    <div className="relative flex">
      <button onClick={handleClick} ref={menuRef}>
        {user?.image ? (
          <Image
            className="w-10 h-10 object-cover rounded-full"
            src={user.image}
            alt="Profile picture"
            width={40}
            height={40}
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-custom-primary text-custom-secondary">
            {user?.name.slice(0, 1)}
          </div>
        )}
      </button>
      {showMenu && (
        <div className="absolute top-12 -left-12 bg-slate-50 text-slate-900 rounded">
          {user.role !== Role.CUSTOMER && (
            <Link
              href={`/dashboard/${user.role}`}
              className="text-left pt-2 pb-1 px-4 w-full hover:bg-slate-300 whitespace-nowrap">
              Dashboard
            </Link>
          )}
          <Link
            className="w-full block pt-2 pb-1 px-4 hover:bg-slate-300 rounded-t"
            href="/perfil">
            Perfil
          </Link>
          <Link
            className="pt-2 pb-1 px-4 w-full hover:bg-slate-300 whitespace-nowrap"
            href="/perfil">
            Mis pedidos
          </Link>

          <button
            onClick={handleLogout}
            className="text-left pb-2 pt-1 px-4 w-full hover:bg-slate-300 rounded-t">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
export default SessionMenu;

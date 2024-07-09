import Link from "next/link";

import SessionMenu from "../SessionMenu";
import CircleButton from "../../shared/CircleButton";
import { UserIcon } from "@/icons";
import { UserSession } from "@/app/lib/definitions";
import { getSession } from "@/app/lib/session";
import arrayNavbarMenu from "@/utils/arrayMenu/arrayNavbarMenu";
import DinamicCart from "./dinamicCart";
import MobileMenu from './mobileMenu';

const HomeMenu = async () => {
  const session = await getSession();
  const user = session?.user as UserSession;

  return (
    <nav className="sticky top-0 z-30">
      <div className="w-full h-16 bg-custom-white backdrop-blur-sm text-custom-black">
        <div className="flex h-full items-center justify-between max-w-[1440px] mx-auto px-8">
          {/* Logo */}
          <div className="flex gap-4 justify-center items-center">
            <Link href={"/"}>
              <h1 className={`font-caveat text-3xl md:text-4xl font-semibold mr-10`}>
                Delicias Gales
              </h1>
            </Link>
          </div>
          {/* Links */}
          <div className='hidden md:flex gap-5'>
            {arrayNavbarMenu.map((item, index) => (
              <Link
                href={item.path}
                key={index}
                className="p-2 rounded-full cursor-pointer hover:bg-custom-secondary font-semibold ">
                {item.name}
              </Link>
            ))}
          </div>
          {/* User Options   */}
          <div className="flex justify-center items-center gap-8">
            <DinamicCart />

            {user ? (
              <SessionMenu user={user} />
            ) : (
              <Link href={"/login"}>
                <CircleButton className="p-2 rounded-full cursor-pointer hover:bg-purple-950/20">
                  <UserIcon className="w-7 h-7" />
                </CircleButton>
              </Link>
            )}
            <div className='md:hidden'>
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default HomeMenu;

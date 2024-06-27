import CartIcon from "@/icons/cart";
import UserIcon from "@/icons/user";
import CircleButton from "../../shared/CircleButton";
import Link from "next/link";
import { UserSession } from "@/app/lib/definitions";
import { getSession } from "@/app/lib/session";
import SessionMenu from "../SessionMenu";
import arrayNavbarMenu from "@/utils/arrayMenu/arrayNavbarMenu";

const HomeMenu = async () => {
  const session = await getSession();
  const user = session?.user as UserSession;

  return (
    <div>
      <div className="sticky z-10 w-full h-16 bg-custom-white backdrop-blur-sm text-custom-black">
        <div className="flex h-full items-center justify-between max-w-[1440px] mx-auto px-8">
          <Link href={"/"}>
            <h1 className={`font-caveat font-semibold text-4xl`}>
              Delicias Gales
            </h1>
          </Link>
          <div>
            {arrayNavbarMenu.map((item, index) => (
              <Link
                href={item.path}
                key={index}
                className="p-2 rounded-full cursor-pointer hover:bg-custom-secondary font-semibold ">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex justify-center items-center gap-8">
            <Link href={"/login"}>
              <CircleButton className="p-2 rounded-full cursor-pointer hover:bg-purple-950/20">
                <CartIcon className="w-7 h-7" />
              </CircleButton>
            </Link>

            {user ? (
              <SessionMenu user={user} />
            ) : (
              <Link href={"/login"}>
                <CircleButton className="p-2 rounded-full cursor-pointer hover:bg-purple-950/20">
                  <UserIcon className="w-7 h-7" />
                </CircleButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeMenu;

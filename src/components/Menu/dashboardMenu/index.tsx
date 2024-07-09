import Link from 'next/link';

import CircleButton from '@/components/shared/CircleButton';
import SessionMenu from '@/components/Menu/SessionMenu';
import { UserIcon } from '@/icons';

const DashboardMenu = async ({ user }) => {
  return (
    <div>
      <div className="fixed z-10 w-full h-16 bg-custom-white backdrop-blur-sm text-custom-black">
        <div className="flex h-full items-center justify-between max-w-[1440px] mx-auto px-8">
          <Link href={"/"}>
            <h1 className={`font-caveat font-semibold text-4xl`}>
              Delicias Gales
            </h1>
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
  )
}
export default DashboardMenu
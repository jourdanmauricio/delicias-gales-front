import CartIcon from '@/icons/cart'
import UserIcon from '@/icons/user'
import CircleButton from '../shared/CircleButton'
import Link from 'next/link';
import { UserSession } from '@/app/lib/definitions';
import { getSession } from '@/app/lib/session';
import SessionMenu from './SessionMenu';

const Menu = async () => {
  const session = await getSession();
  const userSession = session?.user as UserSession;

  return (
    <div>
      <div className='fixed z-10 w-full h-16 bg-purple-950/60 backdrop-blur-sm text-white'>
        <div className='flex h-full items-center justify-between max-w-[1440px] mx-auto px-8'>
          <Link href={"/"}>
            <h1 className={`font-caveat font-semibold text-4xl`}>
              Delicias Gales
            </h1>
          </Link>
          <div className='flex justify-center items-center gap-8'>
            <Link href={'/login'}>
              <CircleButton className='p-2 rounded-full cursor-pointer hover:bg-purple-950/20'>
                <CartIcon className="w-7 h-7" />
              </CircleButton>
            </Link>

            {userSession ? (
              <SessionMenu userSession={userSession} />
            ) : (
              <Link href={'/login'}>
                <CircleButton className='p-2 rounded-full cursor-pointer hover:bg-purple-950/20'>
                  <UserIcon className="w-7 h-7" />
                </CircleButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Menu
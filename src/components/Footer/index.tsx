import Link from 'next/link'

import arrayNavbarMenu from '@/utils/arrayMenu/arrayNavbarMenu';
import SocialNetworks from './socialNetworks';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '@/icons';

const Footer = () => {
  return (
    <footer className='mt-8 bg-gray-900 w-full justify-around text-custom-secondary'>
      <main className='flex flex-col md:flex-row gap-4'>
        <section className='mt-8 w-full md:w-1/3'>
          {/* Logo */}
          <div className="flex gap-4 flex-col justify-center items-center">
            <Link href={"/"}>
              <h1 className={`font-caveat text-3xl md:text-4xl font-semibold mr-10`}>
                Delicias Gales
              </h1>
            </Link>
            <p className='p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, vel? Eum nam rem hic obcaecati praesentium ab, ducimus nisi similique ipsa at officiis impedit veritatis accusamus libero omnis quis debitis.</p>
          </div>
        </section>
        <section className='mt-8 w-full md:w-1/3'>
          {/* Links */}
          <h2 className='text-center text-xl font-semibold'>LINKS</h2>
          <div className="flex mt-8 flex-col gap-2 justify-center items-center">

            {/* Links */}
            {arrayNavbarMenu.map((item, index) => (
              <Link
                href={item.path}
                key={index}
                className="p-2 rounded-full cursor-pointer hover:underline ">
                {item.name}
              </Link>
            ))}
          </div>
        </section>
        <section className='mt-8 w-full md:w-1/3'>
          {/* Links */}
          <h2 className='text-center text-xl font-semibold'>SIGUENOS</h2>
          <div className="flex mt-8 gap-4 justify-center items-center">
            {/* Links */}

            <SocialNetworks href={'#'}>
              <WhatsAppIcon className='h-6 w-6' />
            </SocialNetworks>
            <SocialNetworks href={'#'}>
              <InstagramIcon className='h-6 w-6' />
            </SocialNetworks>
            <SocialNetworks href={'#'}>
              <FacebookIcon className='h-6 w-6' />
            </SocialNetworks>
          </div>
        </section>
      </main>
      <div className='bg-gray-950 w-full flex justify-center'>
        <p className='py-2'>@Delicias Gales 2024</p>
      </div>
    </footer>
  )
}
export default Footer
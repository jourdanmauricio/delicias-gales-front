import Link from 'next/link'

import arrayNavbarMenu from '@/utils/arrayMenu/arrayNavbarMenu';
import SocialNetworks from './socialNetworks';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '@/icons';
import getAllSettings from '@/utils/api/settings/getAllSettings';
import EmailIcon from '@/icons/EmailIcon';
import PhoneIcon from '@/icons/PhoneIcon';

const Footer = async () => {

  const settings = await getAllSettings();

  // const socialNetworks = settings.filter(setting => setting.feature === 'socialNetworks');
  // const facebook = socialNetworks.find(network => network.name === 'facebook');
  // const whatsapp = socialNetworks.find(network => network.name === 'whatsapp');
  // const instagram = socialNetworks.find(network => network.name === 'instagram');

  const socialNetworks = settings
    .filter(item => item.feature === 'socialNetworks')
    .reduce((acc, item) => {
      acc[item.name] = {
        id: item.id,
        value: item.value
      };
      return acc;
    }, {});

  const contact = settings
    .filter(item => item.feature === 'contact')
    .reduce((acc, item) => {
      acc[item.name] = {
        id: item.id,
        value: item.value
      };
      return acc;
    }, {});

  console.log("contact", contact)

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

            {socialNetworks.whatsapp && (
              <SocialNetworks href={socialNetworks.whatsapp.value}>
                <WhatsAppIcon className='h-6 w-6' />
              </SocialNetworks>
            )}
            {socialNetworks.instagram && (
              <SocialNetworks href={socialNetworks.instagram.value}>
                <InstagramIcon className='h-6 w-6' />
              </SocialNetworks>
            )}
            {socialNetworks.facebook && (
              <SocialNetworks href={socialNetworks.facebook.value}>
                <FacebookIcon className='h-6 w-6' />
              </SocialNetworks>
            )}
          </div>
          <div className='mt-8 flex flex-col items-center justify-center gap-4'>
            {contact.email && (
              <div className='flex gap-4 items-center'>
                <EmailIcon className='w-6 h-6' />
                <Link href={`mailto:${contact.email.value}`}>{contact.email.value}</Link>
              </div>
            )}
            {contact.telefono && (
              <div className='flex gap-4 items-center'>
                <PhoneIcon className='w-6 h-6' />
                <p>{contact.telefono.value}</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <div className='mt-4 bg-gray-950 w-full flex justify-center'>
        <p className='py-2'>@Delicias Gales 2024</p>
      </div>
    </footer>
  )
}
export default Footer
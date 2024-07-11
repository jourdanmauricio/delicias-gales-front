"use client";
import SharedIcon from '@/icons/ShareIcon';
import { useState } from 'react';
import ContactInfo from './ContactInfo';

const EcommerceTabs = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="tabs__container mt-2">
      {/* {loading && <Spinner />} */}
      <div className="tabs__bloc">
        <div
          onClick={() => toggleTab(1)}
          className={toggleState === 1 ? 'tabs active__tabs' : 'tabs'}
        >
          <SharedIcon className='w-6 h-6' />
          <span>Contacto</span>
        </div>

        <div
          onClick={() => toggleTab(2)}
          className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}
        >
          {/* <BrandsIcon className='w-6 h-6' /> */}
          <span>Marcas</span>
        </div>

        <div
          onClick={() => toggleTab(3)}
          className={toggleState === 3 ? 'tabs active__tabs' : 'tabs'}
        >
          {/* <AttributesIcon className='w-6 h-6' /> */}
          <span>Atributos</span>
        </div>

      </div>
      <div className="tabs__content p-4">
        <div
          className={`tab__content ${toggleState === 1 ? 'active__content' : ''}`}
        >
          <ContactInfo />
        </div>

        <div
          className={`tab__content ${toggleState === 2 ? 'active__content' : ''}`}
        >
          <h2>Otro</h2>
          {/* <Brands allBrands={allBrands} /> */}
        </div>
        <div
          className={`tab__content ${toggleState === 3 ? 'active__content' : ''}`}
        >
          <h2>OTROOOOO</h2>
          {/* <Attributes allAtributes={allAttributes} /> */}
        </div>
      </div>
    </div>
  )
}
export default EcommerceTabs
"use client";

import { useState } from 'react';

import Categories from './categories/Categories';
import Brands from './brands/Brands';
import Attributes from './attributes/Attributes';
import AttributesIcon from '@/icons/attributes';
import BrandsIcon from '@/icons/brands';
import CategoriesIcon from '@/icons/categories';


const SettingsTabs = ({ allBrands, allAttributes, allCategories }) => {
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
          <CategoriesIcon className='w-6 h-6' />
          <span>Categorías</span>
        </div>

        <div
          onClick={() => toggleTab(2)}
          className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}
        >
          <BrandsIcon className='w-6 h-6' />
          <span>Marcas</span>
        </div>

        <div
          onClick={() => toggleTab(3)}
          className={toggleState === 3 ? 'tabs active__tabs' : 'tabs'}
        >
          <AttributesIcon className='w-6 h-6' />
          <span>Atributos</span>
        </div>

      </div>
      <div className="tabs__content">
        <div
          className={
            toggleState === 1
              ? 'tab__content active__content'
              : 'tab__content'
          }
        >
          <Categories allCategories={allCategories} />
        </div>

        <div
          className={
            toggleState === 2
              ? 'tab__content active__content'
              : 'tab__content'
          }
        >
          <Brands allBrands={allBrands} />
        </div>
        <div
          className={
            toggleState === 3
              ? 'tab__content active__content'
              : 'tab__content'
          }
        >
          <Attributes allAtributes={allAttributes} />
        </div>
      </div>
    </div>
  )
}
export default SettingsTabs
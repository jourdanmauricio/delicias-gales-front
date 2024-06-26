import { useState } from 'react';
import CommonProduct from './CommonProduct/CommonProduct';
import AttributesProduct from './AttributesProduct/AttributesProduct';
import ImagesProduct from './ImagesProduct/ImagesProduct';

const ProductTabs = () => {
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
          {/* <CategoriesIcon className='w-6 h-6' /> */}
          <span>Producto</span>
        </div>

        <div
          onClick={() => toggleTab(2)}
          className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}
        >
          {/* <BrandsIcon className='w-6 h-6' /> */}
          <span>Atributos</span>
        </div>

        <div
          onClick={() => toggleTab(3)}
          className={toggleState === 3 ? 'tabs active__tabs' : 'tabs'}
        >
          {/* <AttributesIcon className='w-6 h-6' /> */}
          <span>Imágenes</span>
        </div>

      </div>
      <div className="tabs__content min-h-[300px] p-4">
        <div
          className={
            toggleState === 1
              ? 'tab__content active__content'
              : 'tab__content'
          }
        >
          <CommonProduct />
        </div>

        <div
          className={
            toggleState === 2
              ? 'tab__content active__content'
              : 'tab__content'
          }
        >

          <AttributesProduct />
        </div>
        <div
          className={
            toggleState === 3
              ? 'tab__content active__content'
              : 'tab__content'
          }
        >
          <ImagesProduct />
        </div>
      </div>
    </div>
  )
}
export default ProductTabs
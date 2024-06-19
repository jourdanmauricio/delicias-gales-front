"use client";
import { useState } from 'react';
import Categories from './categories/Categories';


const SettingsTabs = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(null);
  const [picture, setPicture] = useState(null);
  // const user = useUserStore((state) => state.user);

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
          {/* <FaCloudUploadAlt
            color="teal"
            size={20}
          /> */}
          <span>Categorías</span>
        </div>

        <div
          onClick={() => toggleTab(2)}
          className={toggleState === 2 ? 'tabs active__tabs' : 'tabs'}
        >
          {/* <FaImages
            color="green"
            size={20}
          /> */}
          <span>Marcas</span>
        </div>

        <div
          onClick={() => toggleTab(3)}
          className={toggleState === 3 ? 'tabs active__tabs' : 'tabs'}
        >
          {/* <FaImages
            color="green"
            size={20}
          /> */}
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
          {/* <UploadImage
            handleAddPict={handleAddPict}
            picture={picture}
            setPicture={setPicture}
          /> */}
          {/* {categories} */}
          <Categories />
        </div>

        <div
          className={
            toggleState === 2
              ? 'tab__content active__content'
              : 'tab__content'
          }
        >
          {/* <Gallery
            images={images}
            handleDelete={handleDelete}
            handleSelect={handleSelect}
            setLoading={setLoading}
          /> */}
          {/* {brands} */}
          Brtandas
        </div>

        <div
          className={
            toggleState === 3
              ? 'tab__content active__content'
              : 'tab__content'
          }
        >
          {/* <Gallery
            images={images}
            handleDelete={handleDelete}
            handleSelect={handleSelect}
            setLoading={setLoading}
          /> */}
          {/* {attributes} */}
          ATTRT
        </div>

      </div>
    </div>
  )
}
export default SettingsTabs
"use client";
import 'react-international-phone/style.css';

import Spinner2 from '@/components/shared/Spinner2'
import useNewEditProduct from './useNewEditProduct';
import { Actions } from '@/utils/types/tables/actions.enum';
import Image from 'next/image';
import EditIcon from '@/icons/edit';
import ProductTabs from './ProductTabs';

const NewEditProduct = ({ handleChangeData }) => {
  const { categories, brands, product, loading, preview, onSelectFile, handleChange, handleCancel, hadleSubmit, handleSelectChange, action, errors } = useNewEditProduct({ handleChangeData });
  console.log("categories", categories)
  console.log("product", product)

  return (<>
    <div className='text-sm'><button onClick={handleCancel}>Productos</button> / {action === Actions.NEW ? 'Nuevo' : 'Modificar'}</div>
    <form id='user-form' onSubmit={hadleSubmit} noValidate className='mt-8'>
      {loading && <Spinner2 />}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
        {/* name */}
        <div className="">
          <label className="label-form" htmlFor='name'>Nombre:</label>
          <input
            id='name'
            name="name"
            type="text"
            className="input-form"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={product.name || ''}
          />
          <p className={`input-error ${errors.name ? 'opacity-100' : 'opacity-0'}`}>
            {errors.name}
          </p>
        </div>
        {/* Brand */}
        <div className="relative">
          <label className="label-form" htmlFor='brandId'>Marca:</label>
          <div className="mt-2">
            <select
              id="brandId"
              name="brandId"
              className="input-form"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={product.brandId || ''}
            >
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-4 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
            <p className={`input-error ${errors.brandId ? 'opacity-100' : 'opacity-0'}`}>
              {errors.brandId}
            </p>
          </div>
        </div>
        {/* Código */}
        <div className="">
          <label className="label-form" htmlFor='cod'>Código:</label>
          <input
            id="cod"
            name="cod"
            type="text"
            className="input-form"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={product.cod || ''}
          />
          <p className={`input-error ${errors.cod ? 'opacity-100' : 'opacity-0'}`}>
            {errors.cod}
          </p>
        </div>
        {/* sku */}
        <div className="">
          <label className="label-form" htmlFor='sku'>SKU:</label>
          <input
            id="sku"
            name="sku"
            type="text"
            className="input-form"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={product.sku || ''}
          />
          <p className={`input-error ${errors.sku ? 'opacity-100' : 'opacity-0'}`}>
            {errors.sku}
          </p>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="label-form" htmlFor='description'>Descripcion:</label>
          <textarea
            id="description"
            name="description"
            className="input-form"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={product.description || ''}
          />
          <p className={`input-error ${errors.description ? 'opacity-100' : 'opacity-0'}`}>
            {errors.description}
          </p>
        </div>

        {/* Category */}
        <div className="relative">
          <label className="label-form" htmlFor='categoriesIds'>Categoría:</label>
          <div className="mt-2">
            <select
              id="categoriesIds"
              multiple
              name="categoriesIds"
              className="input-form"
              onChange={(e) => handleSelectChange(e.target.name, e)}
              value={product.categoriesIds || ''}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <p className={`input-error ${errors.categoriesIds ? 'opacity-100' : 'opacity-0'}`}>
              {errors.categoriesIds}
            </p>
          </div>
        </div>
        {/* Thumbnail */}
        <div className='relative h-28 w-40 flex items-center justify-center mx-auto'>
          <div className='h-full w-full'>

            <div className='flex h-full w-full justify-center items-center bg-transparent rounded text-[#4c1d95] border border-solid border-[#4c1d95] font-semibold text-2xl'>
              <Image
                className='w-full h-full object-cover rounded'
                src={preview || product.thumbnail || '/photo-off.svg'}
                alt="Profile picture"
                width={250}
                height={200}
              />
            </div>
          </div>
          <label htmlFor="input-file" className='cursor-pointer absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 backdrop-blur-sm text-center flex justify-center items-center rounded transition-opacity duration-1000 ease-out opacity-0 hover:opacity-100'>
            <EditIcon className='w-10 h-10 text-white' />
            <input
              onChange={onSelectFile}
              id='input-file'
              className='z-20 rounded cursor-pointer absolute top-0 left-0 right-0 bottom-0 opacity-0 hidden'
              type="file"
              accept="image/png, image/jpeg, image/webp, image/jpg"
            />
          </label>
        </div>
      </div>

      <ProductTabs />

      <div className='mt-8 col-span-2 flex justify-between'>
        <button onClick={handleCancel} type='button' className='btn btn-cancel'>Cancelar</button>
        <button type='submit' className='btn btn-confirm'>{action === Actions.NEW ? 'Crear' : 'Modificar'}</button>
      </div>
    </form>
  </>
  )
}
export default NewEditProduct
"use client";
import 'react-international-phone/style.css';

import Spinner2 from '@/components/shared/Spinner2'
import { PRODUCT_STATUS, tradStatus } from '@/utils/types/products/productStatus.enun';
import useNewEditProduct from './useNewEditProduct';
import { Actions } from '@/utils/types/tables/actions.enum';

const NewEditProduct = () => {
  const { categories, product, loading, handleChange, handleCancel, hadleSubmit, action, errors } = useNewEditProduct();
  console.log("categories", categories)
  console.log("product", product)

  return (<>
    <div className='text-sm'><button onClick={handleCancel}>Productos</button> / {action === Actions.NEW ? 'Nuevo' : 'Modificar'}</div>
    <form id='user-form' onSubmit={hadleSubmit} noValidate className='mt-8'>
      {loading && <Spinner2 />}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
        {/* name */}
        <div className="md:col-span-2">
          <label className="label-form" htmlFor='name'>Nombre:</label>
          <input
            name="name"
            type="text"
            className="input-form"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={product.name}
          />
          <p className={`input-error ${errors.name ? 'opacity-100' : 'opacity-0'}`}>
            {errors.name}
          </p>
        </div>
        {/* Código */}
        <div className="">
          <label className="label-form" htmlFor='cod'>Código:</label>
          <input
            name="cod"
            type="text"
            className="input-form"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={product.cod}
          />
          <p className={`input-error ${errors.cod ? 'opacity-100' : 'opacity-0'}`}>
            {errors.cod}
          </p>
        </div>
        {/* sku */}
        <div className="">
          <label className="label-form" htmlFor='sku'>SKU:</label>
          <input
            name="sku"
            type="text"
            className="input-form"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={product.sku}
          />
          <p className={`input-error ${errors.sku ? 'opacity-100' : 'opacity-0'}`}>
            {errors.sku}
          </p>
        </div>
        {/* original_price */}
        <div className="">
          <label className="label-form" htmlFor='originalPrice'>Precio original:</label>
          <input
            name="originalPrice"
            type="text"
            className="input-form"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={product.originalPrice}
          />
          <p className={`input-error ${errors.originalPrice ? 'opacity-100' : 'opacity-0'}`}>
            {errors.originalPrice}
          </p>
        </div>
        {/* wholesalePrice */}
        <div className="">
          <label className="label-form" htmlFor='wholesalePrice'>Precio Mayorista:</label>
          <input
            name="wholesalePrice"
            type="text"
            className="input-form"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={product.originalPrice}
          />
          <p className={`input-error ${errors.originalPrice ? 'opacity-100' : 'opacity-0'}`}>
            {errors.originalPrice}
          </p>
        </div>

        {/* retailPrice */}
        <div className="">
          <label className="label-form" htmlFor='wholesalePrice'>Precio Minorista:</label>
          <input
            name="wholesalePrice"
            type="text"
            className="input-form"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={product.retailPrice}
          />
          <p className={`input-error ${errors.retailPrice ? 'opacity-100' : 'opacity-0'}`}>
            {errors.retailPrice}
          </p>
        </div>
        {/* Status */}
        <div className="relative">
          <label className="label-form" htmlFor='status'>Estado:</label>
          <div className="mt-2">
            <select
              name="status"
              className="input-form"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={product.status}
            >
              {PRODUCT_STATUS.map((status) => (
                <option key={status.id} value={status.id}>
                  {tradStatus(status.value)}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
            <p className={`input-error ${errors.status ? 'opacity-100' : 'opacity-0'}`}>
              {errors.status}
            </p>
          </div>
        </div>
        {/* Description */}
        <div className="md:col-span-2">
          <label className="label-form" htmlFor='description'>Descripcion:</label>
          <textarea
            name="description"
            className="input-form"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={product.description}
          />
          <p className={`input-error ${errors.description ? 'opacity-100' : 'opacity-0'}`}>
            {errors.description}
          </p>
        </div>

      </div>
      <div className='col-span-2 flex justify-between'>
        <button onClick={handleCancel} type='button' className='btn btn-cancel'>Cancelar</button>
        <button type='submit' className='btn btn-confirm'>{action === Actions.NEW ? 'Crear' : 'Modificar'}</button>
      </div>
    </form>
  </>
  )
}
export default NewEditProduct
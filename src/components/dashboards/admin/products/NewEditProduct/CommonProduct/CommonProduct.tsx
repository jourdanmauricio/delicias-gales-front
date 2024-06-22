import { PRODUCT_STATUS, ProductStatus, tradStatus } from '@/utils/types/products/productStatus.enun';
import useCommonProduct from './useCommonProduct'

const CommonProduct = () => {
  const { product, handleChange, errors } = useCommonProduct();
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4'>
      {/* original_price */}
      <div className="">
        <label className="label-form" htmlFor='originalPrice'>Precio original:</label>
        <input
          id="originalPrice"
          name="originalPrice"
          type="text"
          className="input-form"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={product.originalPrice || ''}
        />
        <p className={`input-error ${errors.originalPrice ? 'opacity-100' : 'opacity-0'}`}>
          {errors.originalPrice}
        </p>
      </div>
      {/* wholesalePrice */}
      <div className="">
        <label className="label-form" htmlFor='wholesalePrice'>Precio Mayorista:</label>
        <input
          id="wholesalePrice"
          name="wholesalePrice"
          type="text"
          className="input-form"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={product.wholesalePrice || ''}
        />
        <p className={`input-error ${errors.wholesalePrice ? 'opacity-100' : 'opacity-0'}`}>
          {errors.wholesalePrice}
        </p>
      </div>

      {/* retailPrice */}
      <div className="">
        <label className="label-form" htmlFor='retailPrice'>Precio Minorista:</label>
        <input
          id="retailPrice"
          name="retailPrice"
          type="text"
          className="input-form"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={product.retailPrice || ''}
        />
        <p className={`input-error ${errors.retailPrice ? 'opacity-100' : 'opacity-0'}`}>
          {errors.retailPrice}
        </p>
      </div>

      {/* minQuantity */}
      <div className="">
        <label className="label-form" htmlFor='minQuantity'>Cantidad mínima:</label>
        <input
          id="minQuantity"
          name="minQuantity"
          type="text"
          className="input-form"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={product.minQuantity || ''}
        />
        <p className={`input-error ${errors.minQuantity ? 'opacity-100' : 'opacity-0'}`}>
          {errors.minQuantity}
        </p>
      </div>
      {/* maxQuantity */}
      <div className="">
        <label className="label-form" htmlFor='maxQuantity'>Cantidad máxima:</label>
        <input
          id="maxQuantity"
          name="maxQuantity"
          type="text"
          className="input-form"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={product.maxQuantity || ''}
        />
        <p className={`input-error ${errors.maxQuantity ? 'opacity-100' : 'opacity-0'}`}>
          {errors.maxQuantity}
        </p>
      </div>
      {/* Status */}
      <div className="relative">
        <label className="label-form" htmlFor='status'>Estado:</label>
        <div className="mt-2">
          <select
            id="status"
            name="status"
            className="input-form"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={product.status || ProductStatus.ACTIVE}
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
    </div>
  )
}
export default CommonProduct
import Image from 'next/image';

import CircleButton from '@/components/shared/CircleButton';
import { EditIcon, TrashIcon } from '@/icons';
import { IBrand } from '@/utils/types/brands/IBrand';
import { ICategory } from '@/utils/types/categories/ICategory';

const ExpandedComponent = ({ row, handleDelete, onEdit, brands, categories }) => {

  const { data } = row;

  return (
    <>
      <div className="flex justify-end gap-4 md:hidden">
        <div
          onClick={() => handleDelete(data)}
          className="btn-icon"
        >
          <CircleButton className='p-2 rounded-full cursor-pointer hover:bg-purple-950/20'>
            <TrashIcon className="text-red-700 w-6 h-6" />
          </CircleButton>
        </div>
        <div
          onClick={() => onEdit(data)}
          className="btn-icon"
        >
          <CircleButton className='p-2 rounded-full cursor-pointer hover:bg-purple-950/20'>
            <EditIcon className="text-blue-700 w-6 h-6" />
          </CircleButton>
        </div>
      </div>
      <div className="bg-gray-300 rounded text-sm m-4 p-4 border border-gray-500 shadow-xl grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="grid grid-cols-2">
          <span className="font-semibold">Nombre:</span>
          <span>{data.name}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Slug:</span>
          <span>{data.slug}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Código de descuento:</span>
          <span></span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Marca:</span>
          <span>{brands.find((brand: IBrand) => (brand.id === data.brandId)).name}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Código:</span>
          <span>{data.cod}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Descripción:</span>
          <span>{data.description}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Categorías:</span>
          <span>
            {data.categoriesIds.map((prodCat: string, index: number) => {
              const categoryName = categories.find((cat: ICategory) => cat.id === prodCat).name;
              return (
                <span className="inline" key={prodCat}>
                  {categoryName}{index < data.categoriesIds.length - 1 && ', '}
                </span>
              );
            })}
          </span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Precio original:</span>
          <span>{data.originalPrice}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Precio minorista:</span>
          <span>{data.retailPrice}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Precio mayorista:</span>
          <span>{data.wholesalePrice}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Cantidad mínima:</span>
          <span>{data.minQuantity}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Precio máxima:</span>
          <span>{data.maxQuantity}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Estado:</span>
          <span>{data.status}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Stock:</span>
          <span>{data.stock}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Imagen:</span>
          <Image className='h-[50px] w-[50px] object-cover' src={data.thumbnail} alt={data.name} height={150} width={150} />
        </div>
      </div>
    </>
  )
}
export default ExpandedComponent
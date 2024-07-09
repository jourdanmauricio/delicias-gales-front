import { useEffect, useMemo, useState } from 'react'

import { validateForm, validatefield } from '@/components/forms/validateForm';
import { FilterComponent } from '@/components/shared/Table/FilterComponent';
import CircleButton from '@/components/shared/CircleButton';
import EditIcon from '@/icons/edit';
import PlusIcon from '@/icons/plus';
import TrashIcon from '@/icons/trash';
import Image from 'next/image';
import { tradStatus } from '@/utils/types/products/productStatus.enun';
import getProduct from '@/utils/api/products/getProduct';
import { useProductStore } from '@/store/product.store';
import { Actions } from '@/utils/types/tables/actions.enum';
import { initialProd } from '@/utils/constants';
import { IProduct } from '@/utils/types/products/IProduct';
import { ICategory } from '@/utils/types/categories/ICategory';
import { IBrand } from '@/utils/types/brands/IBrand';

const useProductsTable = ({ products, categories, brands }) => {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [rowExpand, setRowExpand] = useState({});

  const { action, setAction, setProduct } = useProductStore(state => state)

  const filteredItems = data.filter(
    item =>
    (item.name &&
      item.name.toLowerCase().includes(filterText.toLowerCase()))
  );

  useEffect(() => {
    setData(products);
    setAction(Actions.VIEW);
    setProduct(initialProd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  const ExpandedComponent = ({ data }) => <div>
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
  </div>

  const columns = [
    {
      name: 'Imagen',
      width: '90px',
      hide: 768,
      cell: (row: IProduct) => <Image className='w-full h-[60px] object-cover' width={60} height={60} src={row.thumbnail} alt={row.name} />
    },
    {
      name: 'Nombre',
      selector: (row: IProduct) => row.name,
      sortable: true,
    },
    {
      name: 'Código',
      selector: (row: IProduct) => row.cod,
      sortable: true,
      hide: 1024
    },
    {
      name: 'Precio May',
      selector: (row: IProduct) => row.wholesalePrice,
      sortable: true,
      hide: 768,
    },
    {
      name: 'Precio Min',
      selector: (row: IProduct) => row.retailPrice,
      sortable: true,
      hide: 768,
    },
    {
      name: 'Stock',
      selector: (row: IProduct) => row.stock,
      sortable: true,
      hide: 1024,
    },
    {
      name: 'Estado',
      selector: (row: IProduct) => tradStatus(row.status),
      sortable: true,
      hide: 768,
    },
    {
      name: 'Acciones',
      width: '15%',
      // center: true,
      hide: 768,
      cell: (row: IProduct) => (
        <div className="flex gap-4">
          <div
            onClick={() => handleDelete(row)}
            className="btn-icon"
          >
            <CircleButton className='p-2 rounded-full cursor-pointer hover:bg-purple-950/20'>
              <TrashIcon className="text-red-700 w-6 h-6" />
            </CircleButton>
          </div>
          <div
            onClick={() => onEdit(row)}
            className="btn-icon"
          >
            <CircleButton className='p-2 rounded-full cursor-pointer hover:bg-purple-950/20'>
              <EditIcon className="text-blue-700 w-6 h-6" />
            </CircleButton>
          </div>
        </div>
      ),
    },
  ]

  const handleDelete = (row: IProduct) => {
    setProduct(row);
    // verificar Compras!!!!
  }

  const onNew = () => {
    setProduct(initialProd);
    setAction(Actions.NEW)
    // setAction('NEW');
  };

  const onEdit = async (row: IProduct) => {
    const product = await getProduct(row.id);
    setProduct(product);
    setAction(Actions.EDIT)
  };

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <>
        <FilterComponent
          onFilter={e => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
        <button onClick={onNew}>
          <CircleButton className='ml4 p-2 rounded-full cursor-pointer hover:bg-purple-950/20'>
            <PlusIcon className='w-8 h-8 text-teal-700' />
          </CircleButton>
        </button>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText, resetPaginationToggle]);

  const expandRow = (bool: boolean, row: IProduct) => {
    (bool === true) ? setRowExpand(row) : setRowExpand({})
  };

  const handleChangeData = (product: IProduct) => {
    if (action === Actions.EDIT) {
      const newData = data.map(el => el.id === product.id ? product : el)
      setData(newData);
    }
    if (action === Actions.NEW) {
      const newData = [...data, product]
      setData(newData);
    }
    setAction(Actions.VIEW);
    setProduct(initialProd);

  }

  return { columns, action, rowExpand, filteredItems, subHeaderComponentMemo, handleChangeData, ExpandedComponent, expandRow }
}
export default useProductsTable
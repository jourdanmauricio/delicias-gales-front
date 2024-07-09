import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image';

import { FilterComponent } from '@/components/shared/Table/FilterComponent';
import { EditIcon, TrashIcon, PlusIcon } from '@/icons';
import CircleButton from '@/components/shared/CircleButton';
import { tradStatus } from '@/utils/types/products/productStatus.enun';
import getProduct from '@/utils/api/products/getProduct';
import { useProductStore } from '@/store/product.store';
import { Actions } from '@/utils/types/tables/actions.enum';
import { initialProd } from '@/utils/constants';
import { IProduct } from '@/utils/types/products/IProduct';

const useProductsTable = ({ products }) => {
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

  return { columns, action, rowExpand, filteredItems, subHeaderComponentMemo, handleChangeData, handleDelete, onEdit, expandRow }
}
export default useProductsTable
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

const useProductsTable = ({ products }) => {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [rowExpand, setRowExpand] = useState({});

  const { action, setAction, setProduct } = useProductStore(state => state)
  // const state = useProductStore(state => state)

  // console.log("state", state)

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
      <p>{data.name}</p>

      <div className="grid grid-cols-2">
        <span className="font-semibold">Imagen:</span>
        <Image src={data.thumbnail} alt={data.name} height={150} width={150} />
      </div>
    </div>
  </div>

  const columns = [
    {
      name: 'Imagen',
      width: '122px',
      hide: 768,
      cell: row => <Image className='w-full h-[90px] object-cover' width={90} height={90} src={row.thumbnail} alt={row.name} />
    },
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Código',
      selector: row => row.cod,
      sortable: true,
      hide: 768
    },
    {
      name: 'Precio May',
      selector: row => row.wholesalePrice,
      sortable: true,
    },
    {
      name: 'Precio Min',
      selector: row => row.retailPrice,
      sortable: true,
    },
    {
      name: 'Stock',
      selector: row => row.stock,
      sortable: true,
    },
    {
      name: 'Estado',
      selector: row => tradStatus(row.status),
      sortable: true,
    },
    {
      name: 'Acciones',
      width: '15%',
      // center: true,
      hide: 768,
      cell: (row) => (
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

  const handleDelete = (row) => {
    setProduct(row);
    // verificar Compras!!!!
  }

  const onNew = () => {
    setProduct(initialProd);
    setAction(Actions.NEW)
    // setAction('NEW');
  };

  const onEdit = async (row) => {
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

  const expandRow = (bool, row) => {
    (bool === true) ? setRowExpand(row) : setRowExpand({})
  };

  const handleChangeData = (product) => {
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

  return { columns, action, ExpandedComponent, rowExpand, expandRow, filteredItems, subHeaderComponentMemo, handleChangeData }
}
export default useProductsTable
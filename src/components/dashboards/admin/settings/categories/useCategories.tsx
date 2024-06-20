import { useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2';

import { Actions } from '@/utils/types/tables/actions.enum';
import CircleButton from '@/components/shared/CircleButton';
// import getCategories from '@/utils/api/categories/getCategories';
import removeCategory from '@/utils/api/categories/removeCategory';
import EditIcon from '@/icons/edit';
import PlusIcon from '@/icons/plus';
import TrashIcon from '@/icons/trash';
import Image from 'next/image';

const initCat = {
  id: '',
  name: '',
  description: '',
  image: ''
}

const useCategories = ({ allCategories }) => {

  const [categories, setCategories] = useState([]);
  const [currentData, setCurrentData] = useState(initCat);
  const [action, setAction] = useState(Actions.VIEW)
  // const [pending, setPending] = useState(false);
  const [rowExpand, setRowExpand] = useState({});

  // const fetchData = async () => {
  //   setPending(true);
  //   const categories = await getCategories();
  //   setCategories(categories);
  //   setPending(false);
  // }
  useEffect(() => {
    // fetchData()
    setCategories(allCategories);
  }, [allCategories])

  useEffect(() => {
    if (action === Actions.DELETE) {
      handleDelete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action])

  const handleCancel = () => {
    setAction(Actions.VIEW);
    setCurrentData(initCat)
  }

  const columns = [
    {
      name: 'Imagen',
      width: '122px',
      hide: 768,
      cell: row => <Image className='w-full h-[90px] object-cover' width={90} height={90} src={row.image} alt={row.name} />,
    },
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Cantidad',
      selector: row => row.productCount,
      sortable: true,
      hide: 768
    },
    {
      name: 'Acciones',
      width: '15%',
      // center: true,
      hide: 768,
      cell: (row) => (
        <div className="flex gap-4">
          <div
            onClick={() => onDelete(row)}
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

  const onNew = () => {
    setCurrentData(initCat);
    setAction(Actions.NEW)
  }

  const onEdit = (row) => {
    setCurrentData({
      id: row.id,
      name: row.name,
      image: row.image,
      description: row.description
    });
    setAction(Actions.EDIT)
  }

  const onDelete = (row) => {
    setCurrentData(row);
    setAction(Actions.DELETE);
    if (row.productCount > 0) {
      Swal.fire({
        title: 'Error',
        text: "La categoría posee productos",
        icon: 'error'
      });
      handleCancel()
      return
    }
  }

  const handleDelete = () => {
    Swal.fire({
      title: 'Eliminar categoría',
      text: '¿Estás seguro de eliminar la categoría?',
      icon: 'warning',

      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        actions: 'swal-delete-buttons',
      },
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        const cancelButton = Swal.getCancelButton();
        const actionsContainer = confirmButton.parentElement;
        actionsContainer.appendChild(cancelButton);
        actionsContainer.appendChild(confirmButton);
      },
      preConfirm: async () => {
        Swal.showLoading();

        return new Promise((resolve, reject) => {
          try {
            removeCategory(currentData.id);
            resolve(true);
          } catch (error) {
            reject(new Error(error));
          }
        });
      },
      allowOutsideClick: () => !Swal.isLoading() // Deshabilitar clics fuera del modal 
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Categoría eliminada',
          icon: 'success'
        });
      }
      handleRefresh(currentData);

    }).catch((error) => {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error'
      });
    })
  }

  const actionsMenu = useMemo(() => {
    return (
      <button onClick={onNew}>
        <CircleButton className='ml4 p-2 rounded-full cursor-pointer hover:bg-purple-950/20'>
          <PlusIcon className='w-8 h-8 text-teal-700' />
        </CircleButton>
      </button>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ExpandedComponent = ({ data }) => <div className='p-8 flex flex-col gap-4 bg-gray-300'>
    <div className="flex gap-4 justify-end md:hidden">
      <div
        onClick={() => onDelete(data)}
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
        <CircleButton className='py-2 rounded-full cursor-pointer hover:bg-purple-950/20'>
          <EditIcon className="text-blue-700 w-6 h-6" />
        </CircleButton>
      </div>
    </div>
    <p>Nombre: {data.name}</p>
    <p>Cantidad de productos: {data.productCount}</p>
    <p>Descripción: {data.description}</p>
    <Image className='w-[150px] h-[150px] object-cover mx-auto' height={150} width={150} src={data.image} alt={data.name} />
  </div>


  const handleRefresh = (cat) => {

    switch (action) {
      case Actions.NEW:
        setCategories([...categories, { ...cat, productCount: 0 }])
        break;
      case Actions.EDIT:
        const newCat = categories.map((category) => (category.id === cat.id ? { ...cat, productCount: category.productCount } : category))
        setCategories(newCat)
        break;
      case Actions.DELETE:
        const newCategories = categories.filter((category) => category.id !== cat.id);
        setCategories(newCategories);
        break;
    }

    setAction(Actions.VIEW);
    setCurrentData(initCat);
  }

  const expandRow = (bool, row) => {
    (bool === true) ? setRowExpand(row) : setRowExpand({})
  };

  return { categories, currentData, columns, actionsMenu, action, rowExpand, expandRow, ExpandedComponent, handleCancel, handleRefresh }
}
export default useCategories
import { useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2';

import { Actions } from '@/utils/types/tables/actions.enum';
import CircleButton from '@/components/shared/CircleButton';
import getCategories from '@/utils/api/categories/getCategories';
import removeCategory from '@/utils/api/categories/removeCategory';
import EditIcon from '@/icons/edit';
import PlusIcon from '@/icons/plus';
import TrashIcon from '@/icons/trash';
import Spinner2 from '@/components/shared/Spinner2';

const useCategories = () => {

  const [categories, setCategories] = useState([]);
  const [currentData, setCurrentData] = useState({});
  const [action, setAction] = useState(Actions.VIEW)
  const [pending, setPending] = useState(false);

  const fetchData = async () => {
    setPending(true);
    const categories = await getCategories();
    setCategories(categories);
    setPending(false);
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleCancel = () => {
    setAction(Actions.VIEW);
    setCurrentData({})
  }

  const columns = [
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
          {/* <DeleteCategory category={row} handleRefresh={handleRefresh} /> */}
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
    setCurrentData({});
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
            removeCategory(row.id);
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
      handleRefresh(row);

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
    setCurrentData({});
  }

  // const TableLoader = () => (
  //   <div style={{ padding: '24px' }}>
  //     <Spinner2 />
  //     <div>Fancy Loader...</div>
  //   </div>
  // );

  return { categories, currentData, columns, actionsMenu, action, pending, handleCancel, handleRefresh }
}
export default useCategories
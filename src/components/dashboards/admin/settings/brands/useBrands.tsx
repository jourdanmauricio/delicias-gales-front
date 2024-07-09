import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';

import CircleButton from '@/components/shared/CircleButton';
import { EditIcon, PlusIcon, TrashIcon } from '@/icons';
import removeBrand from '@/utils/api/brands/removeBrand';
import { Actions } from '@/utils/types/tables/actions.enum';

const initBrand = {
  id: '',
  name: '',
  image: '',
  description: '',
}

const useBrands = ({ allBrands }) => {
  const [brands, setBrands] = useState([]);
  const [currentData, setCurrentData] = useState(initBrand);
  const [action, setAction] = useState(Actions.VIEW)
  const [rowExpand, setRowExpand] = useState({});

  useEffect(() => {
    setBrands(allBrands);
  }, [allBrands])

  useEffect(() => {
    if (action === Actions.DELETE) {
      handleDelete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action])

  const handleCancel = () => {
    setAction(Actions.VIEW);
    setCurrentData(initBrand)
  }

  const columns = [
    {
      name: 'Imagen',
      width: '122px',
      hide: 768,
      cell: row => <Image className='w-full h-[90px] object-cover' width={90} height={90} src={row.image} alt={row.name} />
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
    setCurrentData(initBrand);
    setAction(Actions.NEW);
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
        text: "La marca posee productos",
        icon: 'error'
      });
      handleCancel()
      return
    }
  }

  const handleDelete = () => {
    Swal.fire({
      title: 'Eliminar marca',
      text: '¿Estás seguro de eliminar la marca?',
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
            const brand = removeBrand(currentData.id);
            resolve(brand);
          } catch (error) {
            reject(new Error(error));
          }
        });
      },
      allowOutsideClick: () => !Swal.isLoading() // Deshabilitar clics fuera del modal 
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Marca eliminada',
          icon: 'success'
        });
        handleRefresh(result.value);
      }
      if (result.isDismissed) handleCancel()

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

  const handleRefresh = (value) => {

    switch (action) {
      case Actions.NEW:
        setBrands([...brands, { ...value, productCount: 0 }])
        break;
      case Actions.EDIT:
        const newValue = brands.map((brand) => (brand.id === value.id ? { ...value, productCount: brand.productCount } : brand))
        setBrands(newValue)
        break;
      case Actions.DELETE:
        const newbrands = brands.filter((brand) => brand.id !== value.id);
        setBrands(newbrands);
        break;
    }

    setAction(Actions.VIEW);
    setCurrentData(initBrand);
  }

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

  const expandRow = (bool, row) => {
    (bool === true) ? setRowExpand(row) : setRowExpand({})
  };

  return { brands, currentData, columns, actionsMenu, action, rowExpand, expandRow, ExpandedComponent, handleCancel, handleRefresh }
}
export default useBrands
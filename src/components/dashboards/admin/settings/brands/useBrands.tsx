import CircleButton from '@/components/shared/CircleButton';
import EditIcon from '@/icons/edit';
import PlusIcon from '@/icons/plus';
import TrashIcon from '@/icons/trash';
// import getBrands from '@/utils/api/brands/getBrands';
import newBrand from '@/utils/api/brands/newBrand';
import removeBrand from '@/utils/api/brands/removeBrand';
import updBrand from '@/utils/api/brands/updBrand';
import { Actions } from '@/utils/types/tables/actions.enum';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';

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
  // const [pending, setPending] = useState(false);

  // const fetchData = async () => {
  //   setPending(true);
  //   const brands = await getBrands();
  //   console.log("Brands", brands)
  //   setBrands(brands);
  //   setPending(false);
  // }
  useEffect(() => {
    //fetchData()
    setBrands(allBrands);
  }, [allBrands])

  useEffect(() => {
    if (action === Actions.NEW || action === Actions.EDIT) {
      handleNewEdit();
    }
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

  const handleNewEdit = () => {
    console.log("handleNewEdit action", action)

    Swal.fire({
      title: 'Nueva marca',
      input: 'text',
      inputLabel: 'Nombre',
      inputValue: currentData.name,
      inputPlaceholder: 'Ingrese el nombre',
      showCancelButton: true,
      confirmButtonText: action === Actions.NEW ? 'Crear' : 'Modificar',
      cancelButtonText: 'Cancelar',
      customClass: {
        actions: 'swal-edit-buttons',
      },
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        const cancelButton = Swal.getCancelButton();
        const actionsContainer = confirmButton.parentElement;
        actionsContainer.appendChild(cancelButton);
        actionsContainer.appendChild(confirmButton);
      },
      inputValidator: (value) => {
        if (!value) {
          return 'El nombre es obligatorio'
        }
      },
      preConfirm: async (value) => {
        Swal.showLoading();

        return new Promise(async (resolve, reject) => {
          try {
            let brand;
            (action === Actions.NEW)
              ? brand = await newBrand({ name: value })
              : brand = await updBrand(currentData.id, { name: value })
            resolve(brand);
          } catch (error) {
            reject(new Error(error));
          }
        });
      },
      allowOutsideClick: () => !Swal.isLoading() // Deshabilitar clics fuera del modal 
    }).then((result) => {

      console.log("Result", result, action)
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Marca creada',
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

    console.log("handleRefresh", action, value)

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


  return { brands, currentData, columns, actionsMenu, action, handleCancel }
}
export default useBrands
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

import { validateForm, validatefield } from '@/components/forms/validateForm';
import { UserStatus, tradStatus } from '@/utils/types/users/userStatus.enum';
import { Role, tradRoles } from '@/utils/types/users/usersRoles';
import { FilterComponent } from '@/components/shared/Table/FilterComponent';
import createUser from '@/utils/api/users/createUser';
import putUser from '@/utils/api/users/putUser';
import CircleButton from '@/components/shared/CircleButton';
import EditIcon from '@/icons/edit';
import PlusIcon from '@/icons/plus';
import TrashIcon from '@/icons/trash';

const intialUser = {
  address: '',
  email: '',
  id: '',
  identification: '',
  registerDate: null,
  name: '',
  phone: '',
  status: UserStatus.ACTIVE,
  role: Role.SELLER
}

const useUsersTable = ({ users }) => {
  const [data, setData] = useState([]);
  const [action, setAction] = useState('VIEW');
  const [currentData, setCurrentData] = useState(intialUser);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = data.filter(
    item =>
    (item.name &&
      item.name.toLowerCase().includes(filterText.toLowerCase()))
  );

  const router = useRouter();

  useEffect(() => {
    setData(users);
  }, [users])

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
        <span className="font-semibold">Email:</span>
        <span>{data.email}</span>
      </div>
      <div className="grid grid-cols-2">
        <span className="font-semibold">Documento:</span>
        <span>{data.identification}</span>
      </div>
      <div className="grid grid-cols-2">
        <span className="font-semibold">Teléfono:</span>
        <span>{data.phone}</span>
      </div>
      <div className="grid grid-cols-2">
        <span className="font-semibold">Estado:</span>
        <span>{tradStatus(data.status)}</span>
      </div>
      <div className="grid grid-cols-2">
        <span className="font-semibold">Tipo cliente:</span>
        <span>{data.customerType}</span>
      </div>
      <div className="grid grid-cols-2">
        <span className="font-semibold">Fecha registro:</span>
        <span>{data.registerDate.split('T')[0]}</span>
      </div>
      <div className="grid grid-cols-2">
        <span className="font-semibold">Dirección:</span>
        <span>{data.address}</span>
      </div>
      <div className="grid grid-cols-2">
        <span className="font-semibold">Website:</span>
        <span>{data.website}</span>
      </div>
      <div className="grid grid-cols-2">
        <span className="font-semibold">Imagen:</span>
        <span>{data.image}</span>
      </div>
    </div>
  </div>

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Teléfono',
      selector: row => row.phone,
      sortable: true,
      hide: 768
    },
    {
      name: 'Role',
      selector: row => tradRoles(row.role),
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
    setCurrentData(row);
    // verificar Compras!!!!
  }

  const onNew = () => {
    setCurrentData(intialUser);
    setAction('NEW');
  };

  const handleCancel = () => {
    setCurrentData(intialUser);
    setAction('VIEW');
  }

  const onEdit = (row) => {
    setCurrentData(row);
    setAction('EDIT');
  };

  const handleChange = (name: string, value: string) => {
    setCurrentData({ ...currentData, [name]: value })

    const error = validatefield(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  }

  const hadleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(currentData, 'userForm');

    const valuesFormError = Object.values(errors);
    if (valuesFormError.some((el) => el !== null)) {
      setErrors(errors)
      return;
    }

    try {
      setLoading(true);
      const { id, ...data } = currentData;
      delete data.registerDate;
      if (action === 'NEW') {
        await createUser(data);
      } else {
        await putUser(id, data);
      }

      router.push('/dashboard/admin/users');
      router.refresh();
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        title: `Usuario ${action === 'NEW' ? 'creado' : 'modificado'} con éxito`,
        showConfirmButton: false,
        width: '450px',
        timer: 1500
      });

    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
      });
    }

  }

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
  }, [filterText, resetPaginationToggle]);

  return { data, columns, action, currentData, loading, ExpandedComponent, hadleSubmit, handleCancel, errors, handleChange, filteredItems, subHeaderComponentMemo }
}
export default useUsersTable
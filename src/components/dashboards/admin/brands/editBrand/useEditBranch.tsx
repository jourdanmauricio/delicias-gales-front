import Swal from 'sweetalert2';

import updBrand from '@/utils/api/brands/updBrand';
import { useRouter } from 'next/navigation';

const useEditBrand = ({ brand }) => {
  const router = useRouter();

  const handleEdit = () => {
    console.log("Edit", brand)
    Swal.fire({
      title: `Modificar marca ${brand.name}`,
      input: 'text',
      inputLabel: 'Nombre',
      inputPlaceholder: brand.name,
      showCancelButton: true,
      confirmButtonText: 'Modificar',
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

        return new Promise((resolve, reject) => {
          try {
            updBrand(brand.id, { name: value });
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
          title: 'Marca modificada',
          icon: 'success'
        });
      }
      router.push('/dashboard/admin/brands');
      router.refresh();
    }).catch((error) => {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error'
      });
    })
  }
  return { handleEdit }
}
export default useEditBrand
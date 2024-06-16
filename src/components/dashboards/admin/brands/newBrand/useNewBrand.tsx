import Swal from 'sweetalert2';

import newBrand from '@/utils/api/brands/newBrand';
import { useRouter } from 'next/navigation';

const useNewBrand = () => {
  const router = useRouter();

  const handleNew = () => {
    console.log("handleNew")

    Swal.fire({
      title: 'Nueva marca',
      input: 'text',
      inputLabel: 'Nombre',
      inputPlaceholder: 'Ingrese el nombre',
      showCancelButton: true,
      confirmButtonText: 'Crear',
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
            newBrand({ name: value });
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
          title: 'Marca creada',
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
  return { handleNew }
}
export default useNewBrand
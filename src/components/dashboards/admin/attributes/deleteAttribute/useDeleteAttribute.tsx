
import removeAttribute from '@/utils/api/attributes/removeAttibute';
import removeBrand from '@/utils/api/brands/removeBrand';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const useDeleteAttribute = ({ attribute }) => {
  const router = useRouter();

  const handleDelete = () => {
    // if (brand.productCount > 0) {
    //   Swal.fire({
    //     title: 'Error',
    //     text: "La marca posee productos",
    //     icon: 'error'
    //   });
    //   return
    // }
    Swal.fire({
      title: 'Eliminar atributo',
      text: '¿Estás seguro de eliminar el atributo?',
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
            removeAttribute(attribute.id);
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
          title: 'Atributo eliminado',
          icon: 'success'
        });
      }
      router.push('/dashboard/admin/attributes');
      router.refresh();
    }).catch((error) => {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error'
      });
    })
  }
  return { handleDelete }
}
export default useDeleteAttribute;
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

import removeCategory from '@/utils/api/categories/removeCategory';

const useDeleteCategory = ({ categoryId, totalProducts }) => {

  const router = useRouter();

  const handleDelete = async () => {
    console.log("delete cat", categoryId)
    if (totalProducts > 0) {
      Swal.fire({
        title: 'Error',
        text: "La categoría posee productos",
        icon: 'error'
      });
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
            removeCategory(categoryId);
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
      router.push('/dashboard/admin/categories');
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
export default useDeleteCategory
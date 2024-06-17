import Swal from 'sweetalert2';

import updBrand from '@/utils/api/brands/updBrand';
import { useRouter } from 'next/navigation';
import updAttribute from '@/utils/api/attributes/updAttribute';

const useEditAttribute = ({ attribute }) => {
  const router = useRouter();

  const handleEdit = () => {
    console.log("Edit", attribute)
    Swal.fire({
      title: `Modificar atibuto ${attribute.name}`,
      html: `
        <div class='text-left'>
            <label for='name' class="label-form">Nombre:</label>
            <input
              id='name'
              name="name"
              value=${attribute.name}
              type="text"
              class="input-form"
              placeholder="Nombre"
            />
          </div>
          <div class='text-left mt-4'>
            <label for='unit' class="label-form">Unidad:</label>
            <input
              id='unit'
              name="unit"
              value=${attribute.unitDefault}
              type="text"
              class="input-form"
              placeholder="Unidad de medida"
            />
          </div>
          `,
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
      preConfirm: async (value) => {
        const elName = document.getElementById('name') as HTMLInputElement;
        const name = elName.value;
        const elUnit = document.getElementById('unit') as HTMLInputElement;
        const unit = elUnit.value;

        if (!name) {
          Swal.showValidationMessage('El nombre es obligatorio');
          return false;
        }

        Swal.showLoading();

        return new Promise(async (resolve, reject) => {
          try {
            await updAttribute(attribute.id, { name: name, unitDefault: unit });
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
          title: 'Atributo modificado',
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
  return { handleEdit }
}
export default useEditAttribute
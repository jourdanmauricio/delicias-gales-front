import Swal from 'sweetalert2';

import newBrand from '@/utils/api/brands/newBrand';
import { useRouter } from 'next/navigation';
import newAttribute from '@/utils/api/attributes/newAttribute';

const useNewAttribute = () => {
  const router = useRouter();

  const handleNew = () => {
    console.log("handleNew")

    Swal.fire({
      title: 'Nuevo atributo',
      // input: 'text',
      html: `
        <div class='text-left'>
            <label for='name' class="label-form">Nombre:</label>
            <input
              id='name'
              name="name"
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
              type="text"
              class="input-form"
              placeholder="Unidad de medida"
            />
          </div>
          `,
      // <input type="text" id="input2" class="swal2-input" placeholder="Input 2">
      // inputLabel: 'Nombre',
      // inputPlaceholder: 'Ingrese el nombre',
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
            const attr = await newAttribute({ name: name, unitDefault: unit })
            console.log("attr", attr)
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
          title: 'Atributo creado',
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
  return { handleNew }
}
export default useNewAttribute
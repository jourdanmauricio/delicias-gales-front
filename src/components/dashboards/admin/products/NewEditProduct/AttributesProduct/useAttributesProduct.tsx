import { useProductStore } from '@/store/product.store';
import getAttributes from '@/utils/api/attributes/getAttributes'
import { Actions } from '@/utils/types/tables/actions.enum';
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const useAttributesProduct = () => {
  const [attributes, setAttributes] = useState([]);
  const product = useProductStore(state => state.product);
  const updProduct = useProductStore(state => state.updProduct);

  const fetchData = async () => {
    const attributes = await getAttributes();
    setAttributes(attributes);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const generateSelectOptions = () => {
    let select = `
    <div class='text-left'>
      <label for='attrId' class="label-form">Atributo:</label>
      <select id="attrId" class="input-form">`;

    attributes.map(option => {
      select += `<option value="${option.id}">${option.name}</option>`;
    });

    select += `
      </select>
    </div>
    <div class='text-left mt-4' >
      <label for='unit' class="label-form">Valor:</label>
      <input
        id='value'
        name="value"
        type="text"
        class="input-form"
        placeholder="Valor"
      />
    </div>
    <div class='text-left mt-4' >
      <label for='unit' class="label-form">Unidad:</label>
      <input
        id='unit'
        name="unit"
        type="text"
        class="input-form"
        placeholder="Unidad de medida"
      />
    </div>`;

    return select;
  };

  const currAttrOption = (attrib) => {
    const attribute = attributes.find((attr) => attr.id === attrib);
    return attribute && attribute.unitDefault || ''
  }

  const handleChangeAttrib = (id, name, value) => {
    console.log("change", id, name, value);
    const newAttribs = product.prodAttributes.map(el => el.id === id ? { ...el, [name]: value, action: el.action === Actions.NEW ? Actions.NEW : Actions.EDIT } : el)
    updProduct('prodAttributes', newAttribs);
  }

  const onNew = () => {
    const newAttribs = [...product.prodAttributes, { id: 'new-1' }];

    Swal.fire({
      title: 'Nuevo atibuto',
      html: generateSelectOptions(),
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
      preConfirm: async () => {
        const elId = document.getElementById('attrId') as HTMLInputElement;
        const id = elId.value;
        const elValue = document.getElementById('value') as HTMLInputElement;
        const value = elValue.value;
        const elUnit = document.getElementById('unit') as HTMLInputElement;
        const unit = elUnit.value;

        if (!id || !value) {
          Swal.showValidationMessage('El nombre y el valor son obligatorios');
          return false;
        }

        const found = product.prodAttributes.findIndex(el => el.attrId === id && el.name !== 'deleted')

        if (found !== -1) {
          Swal.showValidationMessage('El atributo ya existe');
          return false;
        }

        const attribute = attributes.find(el => el.id === id)

        Swal.showLoading();

        return new Promise(async (resolve, reject) => {
          try {
            const newAttributes = [...product.prodAttributes, { id: 'new-1', attributeId: attribute.id, name: attribute.name, value, unit, action: Actions.NEW }]
            updProduct('prodAttributes', newAttributes);
            // (action === Actions.NEW)
            //   ? attribute = await newAttribute({ name, unitDefault })
            //   : attribute = await updAttribute(currentData.id, { name, unitDefault })

            resolve(attribute);
          } catch (error) {
            reject(new Error(error));
          }
        });
      },
      allowOutsideClick: () => !Swal.isLoading() // Deshabilitar clics fuera del modal 
    })
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: 'Atributo modificado',
    //       icon: 'success'
    //     });
    //     //handleRefresh(result.value);
    //   }
    //   if (result.isDismissed) return;
    // })
    // .catch((error) => {
    //   Swal.fire({
    //     title: 'Error',
    //     text: error,
    //     icon: 'error'
    //   });
    // })
    // updProduct('prodAttributes', newAttribs);
  }

  return { attributes, product, currAttrOption, handleChangeAttrib, onNew }
}
export default useAttributesProduct
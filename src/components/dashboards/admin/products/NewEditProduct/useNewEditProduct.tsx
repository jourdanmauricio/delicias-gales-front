/* eslint-disable react-hooks/exhaustive-deps */
import { validateForm } from '@/components/forms/validateForm';
import { useProductStore } from '@/store/product.store';
import getBrands from '@/utils/api/brands/getBrands';
import getCategories from '@/utils/api/categories/getCategories';
import uploadFile from '@/utils/api/files/uploadFile';
import createProductAttribute from '@/utils/api/productAttribute/createProductAttribute';
import removeProductAttribute from '@/utils/api/productAttribute/removeProductAttibute';
import updProductAttribute from '@/utils/api/productAttribute/updProductAttribute';
import createProductimage from '@/utils/api/productImage/createProductImage';
import removeProductImage from '@/utils/api/productImage/removeProductImage';
import createProduct from '@/utils/api/products/createProduct';
import updateProduct from '@/utils/api/products/updateProduct';
import { initialProd } from '@/utils/constants';
import { Actions } from '@/utils/types/tables/actions.enum';
import { ChangeEvent, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const useNewEditProduct = ({ handleChangeData }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState('');

  const { product, action, updProduct, setProduct, setAction } = useProductStore(state => state)
  const state = useProductStore(state => state)

  console.log("STATE", state)

  const fetchData = async () => {
    const categories = await getCategories();
    setCategories(categories);
    const brands = await getBrands();
    setBrands(brands);
    if (action === Actions.NEW) {
      const brand = brands.find(el => el.name.toLowerCase().includes('gales'))
      updProduct('brandId', brand.id)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleChange = (name, value) => {
    updProduct(name, value)
  }

  const handleSelectChange = (name, event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(event.target.selectedOptions, option => (option.value));
    updProduct(name, selectedValues);
  };

  const handleCancel = () => {
    setProduct(initialProd);
    setAction(Actions.VIEW)
  }

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };


  const hadleSubmit = async (e) => {
    e.preventDefault();

    // const errors = validateForm(product, 'userForm');

    // const valuesFormError = Object.values(errors);
    // if (valuesFormError.some((el) => el !== null)) {
    //   setErrors(errors)
    //   return;
    // }

    try {
      setLoading(true);
      const { id, prodAttributes, images, ...data } = product;
      data.originalPrice = +data.originalPrice;
      data.wholesalePrice = +data.wholesalePrice;
      data.retailPrice = +data.retailPrice;
      data.minQuantity = +data.minQuantity;
      data.maxQuantity = +data.maxQuantity;

      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        const { secure_url } = await uploadFile(formData);
        data.thumbnail = secure_url
      }
      if (!data.thumbnail) delete data.thumbnail;

      console.log("DATA", data);
      let prod;
      if (action === Actions.NEW) {
        data.stock = 0;
        prod = await createProduct(data);
        setLoading(false);
        console.log("updProd", prod)
        handleChangeData(prod);

      } else {

        prod = await updateProduct(id, data);
        setLoading(false);
        console.log("updProd", prod)
        handleChangeData(prod);
      }

      // Attributes
      for (const attrib of prodAttributes) {
        if (attrib.action === Actions.NEW) {
          await createProductAttribute({ productId: prod.id, attributeId: attrib.attributeId, value: attrib.value, unit: attrib.unit })
        }
        if (attrib.action === Actions.DELETE) {
          await removeProductAttribute(attrib.id)
        }
        if (attrib.action === Actions.EDIT) {
          await updProductAttribute(attrib.id, { value: attrib.value, unit: attrib.unit })
        }
      }

      // Images
      for (const image of images) {
        if (image.action === Actions.NEW) {
          await createProductimage({ productId: prod.id, secureUrl: image.secureUrl })
        }
        if (image.action === Actions.DELETE) {
          await removeProductImage(image.id)
        }
      }

      await Swal.fire({
        icon: 'success',
        title: `Producto ${action === Actions.NEW ? 'creado' : 'modificado'} con éxito`,
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

  return { categories, brands, product, errors, action, loading, preview, onSelectFile, handleSelectChange, handleChange, handleCancel, hadleSubmit }
}
export default useNewEditProduct
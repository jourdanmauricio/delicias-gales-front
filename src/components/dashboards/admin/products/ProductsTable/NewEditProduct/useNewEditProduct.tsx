/* eslint-disable react-hooks/exhaustive-deps */
import { validateForm } from '@/components/forms/validateForm';
import { useProductStore } from '@/store/product.store';
import getCategories from '@/utils/api/categories/getCategories';
import updateProduct from '@/utils/api/products/updateProduct';
import { Actions } from '@/utils/types/tables/actions.enum';
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const useNewEditProduct = () => {
  const [categories, setCategories] = useState();
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false)

  const { product, action, updProduct, setProduct, setAction } = useProductStore(state => state)
  const state = useProductStore(state => state)

  console.log("STATE", state)

  const fetchData = async () => {
    const categories = await getCategories();
    setCategories(categories)
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleChange = (name, value) => {
    updProduct(name, value)
  }

  const handleCancel = () => {
    setProduct(null);
    setAction(Actions.VIEW)
  }

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
      const { id, prodCategories, ...data } = product;
      data.originalPrice = +data.originalPrice
      data.wholesalePrice = +data.wholesalePrice
      data.retailPrice = +data.retailPrice
      if (action === Actions.NEW) {
        // await createProduct(data);
      } else {
        const updProd = await updateProduct(id, data);
        console.log("updProd", updProd)
      }

      // router.push('/dashboard/admin/users');
      // router.refresh();
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        title: `Usuario ${action === Actions.NEW ? 'creado' : 'modificado'} con éxito`,
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

  return { categories, product, errors, action, loading, handleChange, handleCancel, hadleSubmit }
}
export default useNewEditProduct
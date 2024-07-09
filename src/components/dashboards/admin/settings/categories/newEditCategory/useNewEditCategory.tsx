import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

import { validateForm, validatefield } from '@/components/forms/validateForm';
import newCategory from '@/utils/api/categories/newCategory';
import updCategory from '@/utils/api/categories/updCategory';
import uploadFile from '@/utils/api/files/uploadFile';
import { Actions } from '@/utils/types/tables/actions.enum';


const useNewEditCategory = ({ category, action, handleRefresh }) => {
  const [data, setData] = useState({
    id: '',
    name: '',
    description: '',
    image: null,
  })
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    image: '',
  })
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (action === Actions.EDIT) {
      setData(category)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action])

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

  const handleChange = (name: string, value: string) => {
    setData({ ...data, [name]: value })

    const error = validatefield(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  }

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm(data, 'editCategoryForm');
    const valuesFormError = Object.values(errors);
    if (valuesFormError.some((el) => el !== null)) {
      setErrors(errors)
      return;
    }

    try {
      const { id, ...editData } = data;
      setLoading(true);
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        const { secure_url } = await uploadFile(formData);
        editData.image = secure_url
      }
      if (!editData.image) delete editData.image;

      let newCat;

      (action === Actions.NEW) ?
        newCat = await newCategory(editData) :
        newCat = await updCategory(id, editData)

      handleRefresh(newCat);

      setLoading(false);
      await Swal.fire({
        icon: 'success',
        title: `Categoría ${action === Actions.NEW ? 'creada' : 'modificada'} con éxito`,
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
  };

  return { data, selectedFile, preview, loading, errors, onSelectFile, handleChange, handleSubmit }

}
export default useNewEditCategory;

import { validateForm, validatefield } from '@/components/forms/validateForm';
import newCategory from '@/utils/api/categories/newCategory';
import updCategory from '@/utils/api/categories/updCategory';
import uploadFile from '@/utils/api/files/uploadFile';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const useEditCategoryForm = ({ category }) => {
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

  const router = useRouter();

  useEffect(() => {
    if (category) {
      setData(category)
    } else {
      setData({ ...data, id: 'new' })
    }
    console.log("category", category)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

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

  const handleCancel = () => {
    router.push('/dashboard/admin/categories');
  }
  const handleSubmit = async (event) => {
    console.log("Submit")
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

      (data.id === 'new') ?
        await newCategory(editData) :
        await updCategory(id, editData)

      router.push('/dashboard/admin/categories');
      router.refresh();
      setLoading(false);
      await Swal.fire({
        icon: 'success',
        title: `Categoría ${data.id === 'new' ? 'creada' : 'modificada'} con éxito`,
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

  return { data, selectedFile, preview, loading, errors, onSelectFile, handleChange, handleCancel, handleSubmit }

}
export default useEditCategoryForm
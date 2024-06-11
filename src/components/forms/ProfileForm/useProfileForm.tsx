import { useUserStore } from '@/store/user.store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

import { IUser, initUser, initUserError } from '@/utils/types/users/IUser'
import { validateForm, validatefield } from '../validateForm'
import uploadFile from '@/utils/api/files/uploadFile'
import putUser from '@/utils/api/users/putUser'

const useProfileForm = () => {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<IUser>(initUser)
  const [errors, setErrors] = useState(initUserError)
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState('');

  const router = useRouter();
  const { user, setUser } = useUserStore(state => state)


  useEffect(() => {
    if (user) setProfile(user);
    console.log("user", user)
  }, [user])

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
    setProfile({ ...profile, [name]: value })

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
    router.back();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(profile, 'profileForm');

    const valuesFormError = Object.values(errors);
    if (valuesFormError.some((el) => el !== null)) {
      setErrors(errors)
      return;
    }

    try {
      const { id, registerDate, ...data } = profile

      setLoading(true);
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        const { secure_url } = await uploadFile(formData);
        data.image = secure_url
      }

      const updUser = await putUser(id, data);
      setUser(updUser);
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Perfil modificado',
        showConfirmButton: false,
        width: '450px',
        timer: 1500,
      });
      router.back();
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
        confirmButtonColor: '#222B2D',
      });
    }

  }

  return { profile, errors, loading, selectedFile, preview, onSelectFile, handleChange, handleSubmit, handleCancel }
}
export default useProfileForm
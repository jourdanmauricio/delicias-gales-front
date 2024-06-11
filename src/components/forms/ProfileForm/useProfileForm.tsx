import { useUserStore } from '@/store/user.store'
import { IUser, initUser, initUserError } from '@/utils/types/users/IUser'
import { useEffect, useState } from 'react'
import { validateForm, validatefield } from '../validateForm'

const useProfileForm = () => {
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<IUser>(initUser)
  const [errors, setErrors] = useState(initUserError)
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState('');

  const user = useUserStore(state => state.user)

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

    console.log("Change", name, value)
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(profile, 'profilenForm');

    const valuesFormError = Object.values(errors);
    if (valuesFormError.some((el) => el !== null)) {
      setErrors(errors)
      return;
    }

  }



  return { profile, errors, loading, selectedFile, preview, onSelectFile, handleChange, handleSubmit }
}
export default useProfileForm
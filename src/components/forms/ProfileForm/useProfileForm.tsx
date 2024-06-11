import { useUserStore } from '@/store/user.store'
import { IUser, initUser, initUserError } from '@/utils/types/users/IUser'
import { useEffect, useState } from 'react'
import { validateForm, validatefield } from '../validateForm'
import uploadFile from '@/utils/api/files/uploadFile'
// import putUsers from '@/utils/api/users/putUser'
import { UpdateProfile } from '@/actions/auth'

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(profile, 'profileForm');

    const valuesFormError = Object.values(errors);
    if (valuesFormError.some((el) => el !== null)) {
      setErrors(errors)
      return;
    }

    try {
      // uploadImage
      const { id, registerDate, ...data } = profile

      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        const { secure_url } = await uploadFile(formData);
        console.log("response", secure_url);
        data.image = secure_url
      }

      const updUser = await UpdateProfile(profile.id, data);
      console.log("updUser", updUser)

    } catch (error) {
      //
    }

    console.log("profile", profile)
  }

  return { profile, errors, loading, selectedFile, preview, onSelectFile, handleChange, handleSubmit }
}
export default useProfileForm
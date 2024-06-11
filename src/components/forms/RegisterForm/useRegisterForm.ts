import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

import postRegister from '@/utils/api/auth/register';
import { useUserStore } from '@/store/user.store';
import { validateForm, validatefield } from '../validateForm';
import { customerType } from '@/utils/types/users/customerType';

const useRegisterForm = () => {
  const [newData, setNewData] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const setUser = useUserStore(state => state.setUser);
  const router = useRouter();
  
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfPasswordVisibility = () => {
    setShowConfPassword((prevState) => !prevState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });

    const error = validatefield(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submit")

    const errors = validateForm(newData, 'registerForm');

    const valuesFormError = Object.values(errors);
    if (valuesFormError.some((el) => el !== null)) {
      setErrors(errors)
      return;
    }

    try {
      setLoading(true);
      const data = await postRegister({...newData, customerType: customerType.RETAIL});
      setUser(data.user);
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        showConfirmButton: false,
        width: '450px',
        timer: 2000,
      });
      router.push("/login");
    } catch (error) {
      console.log("Error", error)      
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
        confirmButtonColor: '#222B2D',
      });
    }
  };

  return { newData, errors, loading, showPassword, showConfPassword, handleChange, handleSubmit, togglePasswordVisibility, toggleConfPasswordVisibility };
};
export default useRegisterForm;

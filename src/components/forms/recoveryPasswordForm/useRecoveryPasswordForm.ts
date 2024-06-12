import React, { useState } from 'react';
import Swal from 'sweetalert2';

import recoveryPassword from '@/utils/api/auth/recoveryPassword';
import { useUserStore } from '@/store/user.store';
import { validateForm, validatefield } from '../validateForm';
import { HandleLogout } from '@/actions/auth';
import { useRouter } from 'next/navigation';

const useRecoveryPasswordForm = (token: string) => {
  const router = useRouter();
  const [newData, setNewData] = useState({
    password: '',
    confPassword: '',
  });
  const [errors, setErrors] = useState({
      password: '',
      confPassword: '',
    });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const setUser = useUserStore(state => state.setUser);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfPasswordVisibility = () => {
    setShowConfPassword(!showConfPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setNewData({ ...newData, [name]: value });

    const error = validatefield(name, value);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token)
      Swal.fire({
        icon: 'error',
        title: 'Token Inválido',
      });

    const errors = validateForm(newData, 'recoveryPasswordForm');

    const valuesFormError = Object.values(errors);
    if (valuesFormError.some((el) => el !== null)) {
      setErrors(errors)
      return;
    }  

    if (errors.password || errors.confPassword) return;

    try {
      const data = await recoveryPassword(token, newData.password);
      await Swal.fire({
        icon: 'success',
        title: 'Contraseña modificada',
        showConfirmButton: false, 
        width: '450px',
        timer: 2000,
      });
      HandleLogout();

      setUser(null);
      router.push('/');
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error modificando la contraseña',
        text: error,
      });
    }
  };

  return {
    newData,
    errors,
    showPassword,
    showConfPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    toggleConfPasswordVisibility,
  };
};
export default useRecoveryPasswordForm;

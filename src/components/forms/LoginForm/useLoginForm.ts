import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

import { useUserStore } from '@/store/user.store';
import { validateForm, validatefield } from '../validateForm';
import { HandleLogin } from '@/actions/auth';

const useLoginForm = () => {
  const [newData, setNewData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const setUser = useUserStore(state => state.setUser);
  const router = useRouter();


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

    const errors = validateForm(newData, 'loginForm');

    const valuesFormError = Object.values(errors);
    if (valuesFormError.some((el) => el !== null)) {
      setErrors(errors)
      return;
    }

    try {
      setLoading(true);
      const data = await HandleLogin(newData);
      setUser(data.user);
      setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          showConfirmButton: false,
          width: '450px',
          timer: 2000,
       });
      router.push("/");
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

  return { newData, errors, loading, handleChange, handleSubmit };
};
export default useLoginForm;

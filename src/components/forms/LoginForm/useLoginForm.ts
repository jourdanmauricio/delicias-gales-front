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
  const {setUser, user} = useUserStore(state => state);

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


    setLoading(true);
    const data = await HandleLogin(newData);
    setLoading(false);
    if (!data.error) {
      setUser(data.user);
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        width: '450px',
        timer: 1500,
      });
     router.push("/");
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.error,
        confirmButtonColor: '#222B2D',
      });
    }
  };

  return { newData, errors, loading, handleChange, handleSubmit };
};
export default useLoginForm;

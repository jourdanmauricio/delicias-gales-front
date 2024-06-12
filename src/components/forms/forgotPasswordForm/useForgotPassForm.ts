import forgotPassword from '@/utils/api/auth/forgotPassword';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { validateForm, validatefield } from '../validateForm';

const useForgotPassForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmail(value);

    const error = validatefield(name, value);
    setEmailError(error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm({email}, 'forgotPasswordForm');

    const valuesFormError = Object.values(errors);
    if (valuesFormError.some((el) => el !== null)) {
      setEmailError(errors.email)
      return;
    }  

    try {
      setLoading(true);
      await forgotPassword(email);
      setLoading(false);
      
      await Swal.fire({
        icon: 'success',
        title: 'Te enviamos un email',
        text: 'Sigue las intrucciones del email para cambiar la contraseña. Ya puedes cerrar esta pestaña del navegador.',
        showConfirmButton: false, 
        width: '450px',
      });
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
      });
    }
  };

  return { email, emailError, loading, handleChange, handleSubmit };
};

export default useForgotPassForm;

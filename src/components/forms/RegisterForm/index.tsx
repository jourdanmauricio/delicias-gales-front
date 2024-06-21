'use client';
import React from 'react';

import Link from 'next/link';
import Spinner2 from '@/components/shared/Spinner2';
import EyeIcon from '@/icons/eye';
import EyeSlashIcon from '@/icons/eyeSlash';
import useRegisterForm from './useRegisterForm';

const LoginForm = () => {
  const { newData, errors, loading, showPassword, showConfPassword, handleChange, handleSubmit, togglePasswordVisibility, toggleConfPasswordVisibility } = useRegisterForm();

  return (
    <>
      <div className="relative h-screen w-full">
        <div className="flex justify-center items-center h-full w-full">
          <form
            noValidate
            className="relative flex flex-col gap-2 rounded-2xl bg-custom-white mx-10 px-4 py-4   shadow-lg max-w-[400px] w-full"
            onSubmit={handleSubmit}
          >
            {loading && <Spinner2 />}
            <h1 className="m-2 text-center text-2xl font-bold text-gray-800">
              Registro
            </h1>

            <div className="mb-2 flex flex-col">
              <label className="label-form" htmlFor="name">
                Nombre completo
              </label>
              <div className="relative flex items-center justify-center gap-2 rounded-lg border-2 bg-custom-white">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre completo"
                  className="input-form"
                  onChange={handleChange}
                  value={newData.name}
                />
              </div>
              <p className={`input-error ${errors.name ? 'opacity-100' : 'opacity-0'}`}>
                {errors.name}
              </p>
            </div>

            <div className="mb-2 flex flex-col">
              <label className="label-form" htmlFor="email">
                Email
              </label>
              <div className="relative flex items-center justify-center gap-2 rounded-lg border-2 bg-custom-white">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input-form"
                  onChange={handleChange}
                  value={newData.email}
                />
              </div>
              <p className={`input-error ${errors.email ? 'opacity-100' : 'opacity-0'}`}>
                {errors.email}
              </p>
            </div>
            <div className="mb-2 flex flex-col">
              <label className="label-form" htmlFor="email">
                Contraseña
              </label>
              <div className="relative flex items-center justify-center gap-2 rounded-lg border-2 bg-custom-white">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder='Contraseña'
                  className="input-form"
                  onChange={handleChange}
                  value={newData.password}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 text-gray-700 px-2 py-1 rounded"
                >
                  {showPassword ? <EyeIcon className='' />
                    :
                    <EyeSlashIcon className='' />
                  }
                </button>

              </div>
              <p className={`input-error ${errors.password ? 'opacity-100' : 'opacity-0'}`}>
                {errors.password}
              </p>
            </div>

            <div className="mb-2 flex flex-col">
              <label className="label-form" htmlFor="email">
                Confirmación de contraseña
              </label>
              <div className="relative flex items-center justify-center gap-2 rounded-lg border-2 bg-custom-white">
                <input
                  type={showConfPassword ? 'text' : 'password'}
                  name="confPassword"
                  placeholder='Confirmación de contraseña'
                  className="input-form"
                  onChange={handleChange}
                  value={newData.confPassword}
                />

                <button
                  type="button"
                  onClick={toggleConfPasswordVisibility}
                  className="absolute right-3 text-gray-700 px-2 py-1 rounded"
                >
                  {showConfPassword ? <EyeIcon className='' />
                    :
                    <EyeSlashIcon className='' />
                  }
                </button>

              </div>
              <p className={`input-error ${errors.confPassword ? 'opacity-100' : 'opacity-0'}`}>
                {errors.confPassword}
              </p>
            </div>

            <Link href='/login' className='ml-auto underline text-sm'>
              ¿Tienes cuenta? Iniciar sesión
            </Link>
            <button
              className="btn btn-confirm"
              type="submit"
            >
              Registrarse
            </button>
          </form>
        </div >
      </div >
    </>
  );
};

export default LoginForm;


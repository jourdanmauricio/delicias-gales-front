'use client';

import React from 'react';

import useRecoveryPasswordForm from './useRecoveryPasswordForm';
import { EyeIcon, EyeSlashIcon } from '@/icons';

const RecoveryPasswordForm = ({ searchParams }: { searchParams: { token: string } }) => {

  const token = searchParams.token;

  const { newData, errors, showPassword, showConfPassword, handleChange, handleSubmit, togglePasswordVisibility, toggleConfPasswordVisibility } = useRecoveryPasswordForm(token as string);

  return (
    <div className="relative h-screen w-full">
      <div className="flex justify-center items-center h-full w-full pt-12">
        <form
          className="flex flex-col gap-4 rounded-2xl bg-custom-white mx-10 md:ml-12 px-8 pb-8 pt-6 shadow-lg max-w-[400px] w-full"
          onSubmit={handleSubmit}
        >
          <h1 className="m-6 text-center text-2xl font-bold text-gray-800">
            Nueva contraseña
          </h1>

          {/* password */}
          <div className="mb-4 flex flex-col">
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
                {showPassword ?
                  <EyeIcon className='' />
                  :
                  <EyeSlashIcon className='' />
                }
              </button>
            </div>
            <p className={`input-error ${errors.password ? 'opacity-100' : 'opacity-0'}`}>
              {errors.password}
            </p>
          </div>
          {/* confPassword */}
          <div className="mb-4 flex flex-col">
            <label className="label-form" htmlFor="email">
              Confirmación contraseña
            </label>
            <div className="relative flex items-center justify-center gap-2 rounded-lg border-2 bg-custom-white">
              <input
                type={showConfPassword ? 'text' : 'password'}
                name="confPassword"
                placeholder='Contraseña'
                className="input-form"
                onChange={handleChange}
                value={newData.confPassword}
              />
              <button
                type="button"
                onClick={toggleConfPasswordVisibility}
                className="absolute right-3 text-gray-700 px-2 py-1 rounded"
              >
                {showConfPassword ?
                  <EyeIcon className='' />
                  :
                  <EyeSlashIcon className='' />
                }
              </button>
            </div>
            <p className={`input-error ${errors.confPassword ? 'opacity-100' : 'opacity-0'}`}>
              {errors.confPassword}
            </p>
          </div>

          <button
            className="btn btn-confirm"
            type="submit"
          >
            Recuperar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoveryPasswordForm;

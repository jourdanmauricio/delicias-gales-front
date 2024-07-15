"use client";
import React, { useState } from "react";
import useLoginForm from "../LoginForm/useLoginForm";
import Link from "next/link";
import Spinner2 from "@/components/shared/Spinner2";
import { EyeIcon, EyeSlashIcon } from "@/icons";
import GoogleIcon from "@/icons/GoogleIcon";
const url = process.env.NEXT_PUBLIC_API_URL;

const LoginForm = () => {
  const { newData, errors, loading, handleChange, handleSubmit } =
    useLoginForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="relative h-screen w-full">
        <div className="flex justify-center items-center h-full w-full pt-12">
          <form
            noValidate
            className="relative flex flex-col gap-4 rounded-2xl bg-custom-white mx-10 md:ml-12 px-8 pb-8 pt-6 shadow-lg max-w-[400px] w-full"
            onSubmit={handleSubmit}>
            {loading && <Spinner2 />}
            <h1 className="m-4 text-center text-2xl font-bold text-gray-800">
              Iniciar Sesión
            </h1>

            <div className="mb-4 flex flex-col">
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
              <p
                className={`input-error ${
                  errors.email ? "opacity-100" : "opacity-0"
                }`}>
                {errors.email}
              </p>
            </div>
            <div className="mb-4 flex flex-col">
              <label className="label-form" htmlFor="email">
                Contraseña
              </label>
              <div className="relative flex items-center justify-center gap-2 rounded-lg border-2 bg-custom-white">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  className="input-form"
                  onChange={handleChange}
                  value={newData.password}
                />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 text-gray-700 px-2 py-1 rounded">
                  {showPassword ? (
                    <EyeIcon className="" />
                  ) : (
                    <EyeSlashIcon className="" />
                  )}
                </button>
              </div>
              <p
                className={`input-error ${
                  errors.password ? "opacity-100" : "opacity-0"
                }`}>
                {errors.password}
              </p>
            </div>

            <Link href="/register" className="ml-auto underline text-sm">
              ¿No tienes cuenta? Registrate
            </Link>
            <button className="btn btn-confirm" type="submit">
              Iniciar Sesión
            </button>
            <Link href="/forgot-password" className="ml-auto underline text-sm">
              Olvidé mi contraseña
            </Link>
            <Link href={`${url}/auth/google/login`} className="btn btn-confirm">
              <button className="flex  items-center gap-2">
                <GoogleIcon className="w-8 h-8" />
                Registrame con Google
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;

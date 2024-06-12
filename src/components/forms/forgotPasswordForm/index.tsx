"use client"
import Link from 'next/link';
import useForgotPassForm from './useForgotPassForm';
import Spinner2 from '../../shared/Spinner2';

const ForgotPassForm = () => {
  const { email, emailError, loading, handleChange, handleSubmit } = useForgotPassForm();
  return (
    <div className="relative h-screen w-full">
      <div className="flex justify-center items-center h-full w-full pt-12">
        <form
          noValidate
          className="flex flex-col gap-4 rounded-2xl bg-custom-white mx-10 md:ml-12 px-8 pb-8 pt-6 shadow-lg max-w-[400px] w-full"
          onSubmit={handleSubmit}
        >
          {loading && <Spinner2 />}
          <h1 className="m-6 text-center text-2xl font-bold text-gray-800">
            Recuperar contraseña
          </h1>

          <p className="mb-4">
            Ingresa la dirección de correo electrónico. Te enviaremos un email para cambiar la contraseña.
          </p>

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
                value={email}
              />
            </div>
            <p className={`input-error ${emailError ? 'opacity-100' : 'opacity-0'}`}>
              {emailError}
            </p>
          </div>

          <Link href='/login' className='ml-auto underline'>
            Iniciar sesión
          </Link>
          <button
            className="btn btn-confirm"
            type="submit"
          >
            Enviar email
          </button>
        </form>
      </div>
    </div>
  )
}
export default ForgotPassForm
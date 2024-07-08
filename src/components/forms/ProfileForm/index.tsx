"use client";

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

import Spinner2 from '@/components/shared/Spinner2'
import useProfileForm from './useProfileForm'
import Image from 'next/image';
import EditIcon from '@/icons/edit';

const Profile = () => {
  const { profile, loading, errors, selectedFile, preview, handleChange, handleSubmit, onSelectFile, handleCancel } = useProfileForm()
  return (

    <main className='max-w-[1024px] min-h-screen mx-auto px-10'>
      <form
        id='profile-form'
        className="mt-10"
        onSubmit={handleSubmit}
        noValidate
      >
        {loading && <Spinner2 />}

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>

          <h2 className="text-center text-4xl font-bold">
            Datos de perfil
          </h2>

          {/* image */}
          <div className='mx-auto relative h-28 w-28 flex items-center justify-center'>
            <div className='h-full w-full'>
              {!profile.image && !selectedFile && !preview ? (
                <div className='flex h-full w-full justify-center items-center bg-transparent rounded-full text-[#4c1d95] border border-solid border-[#4c1d95] font-semibold text-2xl'>{profile.name?.substring(0, 1)}</div>
              ) : (
                <div className='flex h-full w-full justify-center items-center bg-transparent rounded-full text-[#4c1d95] border border-solid border-[#4c1d95] font-semibold text-2xl'>
                  <Image
                    className='w-full h-full object-cover rounded-full'
                    src={preview || profile.image || 'photo-off.svg'}
                    alt="Profile picture"
                    width={200}
                    height={200}
                  />
                </div>
              )}

            </div>
            <label htmlFor="input-file" className='cursor-pointer absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 backdrop-blur-sm text-center flex justify-center items-center rounded-full transition-opacity duration-1000 ease-out opacity-0 hover:opacity-100'>
              <EditIcon className='w-10 h-10' />
              <input
                onChange={onSelectFile}
                id='input-file'
                className='z-20 rounded-full cursor-pointer absolute top-0 left-0 right-0 bottom-0 opacity-0 hidden'
                type="file"
                accept="image/png, image/jpeg, image/webp, image/jpg"
              />
            </label>
          </div>

          {/* name */}
          <div className="">
            <label className="label-form">Nombre completo:</label>
            <input
              name="name"
              type="text"
              className="input-form"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={profile.name}
            />
            <p className={`input-error ${errors.name ? 'opacity-100' : 'opacity-0'}`}>
              {errors.name}
            </p>
          </div>
          {/* email */}
          <div className="">
            <label className="label-form">Email:</label>
            <input
              name="email"
              type="email"
              className="input-form"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={profile.email}
            />
            <p className={`input-error ${errors.email ? 'opacity-100' : 'opacity-0'}`}>
              {errors.email}
            </p>
          </div>
          {/* phone */}
          <div className="">
            <label className="label-form">Teléfono:</label>
            <PhoneInput
              className='input-form'
              defaultCountry="ar"
              name="phone"
              value={profile.phone || ''}
              onChange={(phone) => handleChange("phone", phone)}
            />
            <p className={`input-error ${errors.phone ? 'opacity-100' : 'opacity-0'}`}>
              {errors.phone}
            </p>
          </div>
          {/* identification */}
          <div className="">
            <label className="label-form">DNI:</label>
            <input
              name="identification"
              type="text"
              placeholder='Número de documento'
              className="input-form"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={profile.identification || ''}
            />
            <p className={`input-error ${errors.identification ? 'opacity-100' : 'opacity-0'}`}>
              {errors.identification}
            </p>
          </div>
          {/* address */}
          <div className="">
            <label className="label-form">Dirección:</label>
            <input
              name="address"
              type="text"
              placeholder='Dirección'
              className="input-form"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={profile.address || ''}
            />
            <p className={`input-error ${errors.address ? 'opacity-100' : 'opacity-0'}`}>
              {errors.address}
            </p>
          </div>
          {/* website */}
          <div className="">
            <label className="label-form">Sitio web:</label>
            <input
              name="website"
              type="text"
              placeholder='Sitio web'
              className="input-form"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={profile.website || ''}
            />
            <p className={`input-error ${errors.website ? 'opacity-100' : 'opacity-0'}`}>
              {errors.website}
            </p>
          </div>

        </div>
        <div className='col-span-2 flex justify-between'>
          <button onClick={handleCancel} type='button' className='btn btn-cancel'>Cancelar</button>
          <button type='submit' className='btn btn-confirm'>Modificar</button>
        </div>
      </form>
    </main >
  )
}
export default Profile
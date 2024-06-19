"use client";

import EditIcon from '@/icons/edit'
import Spinner2 from '@/components/shared/Spinner2'
import Image from 'next/image'
import useNewEditCategory from './useNewEditCategory';
import { Actions } from '@/utils/types/tables/actions.enum';

const NewEditCategory = ({ category, handleCancel, handleRefresh, action }) => {
  const { data, selectedFile, preview, loading, errors, onSelectFile, handleChange, handleSubmit } = useNewEditCategory({ category, handleRefresh, action });

  return (
    <form
      id='category-form'
      className="mt-10"
      onSubmit={handleSubmit}
      noValidate
    >
      {loading && <Spinner2 />}

      <div className='flex justify-evenly items-center w-full'>
        <h2 className="text-xl font-bold">
          Categoría {data.name}
        </h2>
        {/* image */}
        <div className='relative h-28 w-40 flex items-center justify-center'>
          <div className='h-full w-full'>

            <div className='flex h-full w-full justify-center items-center bg-transparent rounded text-[#4c1d95] border border-solid border-[#4c1d95] font-semibold text-2xl'>
              <Image
                className='w-full h-full object-cover rounded'
                src={preview || data.image || '/photo-off.svg'}
                alt="Profile picture"
                width={250}
                height={200}
              />
            </div>
          </div>
          <label htmlFor="input-file" className='cursor-pointer absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 backdrop-blur-sm text-center flex justify-center items-center rounded transition-opacity duration-1000 ease-out opacity-0 hover:opacity-100'>
            <EditIcon className='w-10 h-10 text-white' />
            <input
              onChange={onSelectFile}
              id='input-file'
              className='z-20 rounded cursor-pointer absolute top-0 left-0 right-0 bottom-0 opacity-0 hidden'
              type="file"
              accept="image/png, image/jpeg, image/webp, image/jpg"
            />
          </label>
        </div>
      </div>

      {/* name */}
      <div className="w-full mt-16">
        <label className="label-form">Nombre:</label>
        <input
          name="name"
          type="text"
          className="input-form"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={data.name}
        />
        <p className={`input-error ${errors.name ? 'opacity-100' : 'opacity-0'}`}>
          {errors.name}
        </p>
      </div>
      {/* Description */}
      <div className="">
        <label className="label-form">Descripción:</label>
        <textarea
          name="description"
          rows={3}
          className="input-form"
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          value={data.description}
        />
        <p className={`input-error ${errors.description ? 'opacity-100' : 'opacity-0'}`}>
          {errors.description}
        </p>
      </div>

      <div className='col-span-2 flex justify-between'>
        <button onClick={handleCancel} type='button' className='btn btn-cancel'>Cancelar</button>
        <button type='submit' className='btn btn-confirm'>{action === Actions.NEW ? 'Crear' : 'Modificar'}</button>
      </div>
    </form>
  )
}
export default NewEditCategory;
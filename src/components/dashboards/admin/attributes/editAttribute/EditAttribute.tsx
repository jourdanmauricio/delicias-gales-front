"use client";

import CircleButton from '@/components/shared/CircleButton'
import EditIcon from '@/icons/edit'
import useEditAttribute from './useEditAttribute';

const EditAttribute = ({ attribute }) => {
  const { handleEdit } = useEditAttribute({ attribute });
  return (
    <button onClick={handleEdit}>
      <CircleButton className='p-2 rounded-full cursor-pointer hover:bg-purple-950/20'>
        <EditIcon className='w-6 h-6' />
      </CircleButton>
    </button>
  )
}
export default EditAttribute
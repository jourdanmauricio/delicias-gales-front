"use client";
import TrashIcon from '@/icons/trash';
import CircleButton from '@/components/shared/CircleButton';
import useDeleteAttribute from './useDeleteAttribute';

const DeleteAttribute = ({ attribute }) => {
  const { handleDelete } = useDeleteAttribute({ attribute })

  return (
    <button onClick={handleDelete}>
      <CircleButton className='p-2 rounded-full cursor-pointer hover:bg-purple-950/20'>
        <TrashIcon className='w-6 h-6 text-red-700' />
      </CircleButton>
    </button>
  )
}
export default DeleteAttribute;
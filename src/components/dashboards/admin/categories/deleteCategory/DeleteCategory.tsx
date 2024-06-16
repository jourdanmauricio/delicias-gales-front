"use client";
import useDeleteCategory from './useDeleteCategory';
import TrashIcon from '@/icons/trash';

import CircleButton from '@/components/shared/CircleButton';

const DeleteCategory = ({ categoryId, totalProducts }) => {
  const { handleDelete } = useDeleteCategory({ categoryId, totalProducts })
  return (
    <button onClick={handleDelete}>
      <CircleButton className="p-2 rounded-full cursor-pointer bg-purple-200  hover:bg-purple-950/20">
        <TrashIcon className="w-6 h-6 text-red-700" />
      </CircleButton>
    </button>
  )
}
export default DeleteCategory
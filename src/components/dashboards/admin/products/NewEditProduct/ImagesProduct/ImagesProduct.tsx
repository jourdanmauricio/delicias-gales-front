import CircleButton from '@/components/shared/CircleButton'
import PlusIcon from '@/icons/plus'
import useImagesProduct from './useImagesProduct'
import { Modal } from '@/components/shared/Modal/Modal';
import UploadFile from '../UploadFile/UploadFile';
import Image from 'next/image';
import TrashIcon from '@/icons/trash';
import { Actions } from '@/utils/types/tables/actions.enum';

const ImagesProduct = () => {
  const { product, onNew, isOpenModalUp, closeModalUp, handleDelete } = useImagesProduct();
  return (
    <div className=''>
      <button type='button' className='ml-auto block' onClick={onNew}>
        <CircleButton className='ml4 p-2 rounded-full cursor-pointer hover:bg-purple-950/20'>
          <PlusIcon className='w-8 h-8 text-teal-700' />
        </CircleButton>
      </button>

      <div className='mt-4 flex gap-4 flex-wrap'>
        {product.images.map(image => (
          <>
            {image.action !== Actions.DELETE && (
              <div key={image.id} className='relative'>
                <Image
                  className='w-[90px] h-[90px] rounded object-cover'
                  width={90}
                  height={90}
                  src={image.secureUrl}
                  alt={image.id} />

                <button
                  className='absolute top-0 right-0'
                  type='button' onClick={() => handleDelete(image.id)}>
                  <CircleButton className='ml4 p-2 rounded-full cursor-pointer bg-slate-300/40 hover:bg-purple-950/20'>
                    <TrashIcon className='text-red-700 w-6 h-6' />
                  </CircleButton>
                </button>
              </div>
            )}
          </>
        )
        )}
      </div>

      {
        isOpenModalUp &&
        <Modal
          isOpenModal={isOpenModalUp}
          closeModal={closeModalUp}
        >
          <UploadFile handleCancel={closeModalUp} />
        </Modal>
      }

    </div >
  )
}
export default ImagesProduct
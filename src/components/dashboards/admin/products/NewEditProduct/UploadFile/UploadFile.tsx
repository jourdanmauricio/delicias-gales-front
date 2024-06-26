import Image from 'next/image';
import useUploadFile from './useUploadFile';
import Spinner2 from '@/components/shared/Spinner2';

const UploadFile = ({ handleCancel }) => {

  const { images, loading, handleDrop, handleFileSelect, handleUpload } = useUploadFile({ handleCancel })

  return (
    <div>
      {loading && <Spinner2 />}
      <h2 className='p-2 font-semibold'>Upload images</h2>
      <hr className='border border-gray-950' />
      <div className="max-w-md mx-auto bg-white rounded-md shadow-md mt-4">
        <div
          className="relative border-4 border-dashed border-gray-300 p-6 rounded-md text-center cursor-pointer"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p className="mb-2 text-gray-600">Drag & Drop your files here or click to upload</p>
          <input
            onChange={handleFileSelect}
            className="absolute cursor-pointer opacity-0 w-full h-full top-0 left-0"
            type="file"
            multiple
          />
          <h3 className="text-slate-900 dark:text-slate-50">
            Drag and drop file here or
          </h3>
          <br />
          <label className="ml-2.5 mt-10 text-white w-[183px] h-[44px] rounded-[21.5px] bg-red-600 py-2 px-4">
            Browse file
          </label>
        </div>

        <div className="mt-4 flex gap-4">
          {images.map((image, index) => (
            <Image
              width={75}
              height={75}
              key={index}
              src={image}
              alt={`Preview ${index}`}
              className="w-[75px] h-[75px] object-cover rounded-md shadow-md"
            />
          ))}
        </div>

        <div className='flex justify-between py-8'>
          <button onClick={handleCancel} type='button' className='btn btn-cancel'>Cancelar</button>
          <button onClick={handleUpload} type='button' className='btn btn-confirm'>Upload</button>
        </div>
      </div>

    </div>
  );
};

export default UploadFile;

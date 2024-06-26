/* eslint-disable react/prop-types */
import Image from 'next/image';
import { useState } from 'react';

const UploadImage = ({ picture, setPicture, handleAddPict }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    setDragActive(false);
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const newImage = file;
    file.secure_url = URL.createObjectURL(file);
    setPicture(newImage);
  };

  const handleSubmit = async () => {
    handleAddPict(picture);
  };

  return (
    <div className="w-full lg:w-[80%] mx-auto">
      <div className="my-5 mt-5">
        <div className="w-[80%] h-[200px] mx-auto border border-solid border-gray-500 p-2">
          {picture && (
            <div className="flex flex-col sm:flex-row gap-10">
              <div className="mx-auto">
                <label
                  className="form__label"
                  htmlFor="image"
                >
                </label>
                <Image
                  height={180}
                  width={180}
                  className="rounded border border-solid border-gray-500 w-[180px] h-[180px] object-contain aspect-square"
                  id="image"
                  src={picture.secure_url}
                  alt="chosen"
                />
                {/* name="image" */}
              </div>
              <div>
                <p className="h-fit text-gray-800">
                  Recuerde optimizar la imagen en{' '}
                  <a
                    href="https://tinyjpg.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://tinyjpg.com/ antes de subirla al servidor.
                  </a>
                </p>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="btn btn-confirm block mx-auto mt-5"
                >
                  Enviar
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          className={`relative w-[80%] mx-auto mt-5 p-8 text-center border-2 border-dotted border-black ${!dragActive ? '' : 'fileover'}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onDragLeave={handleDrag}
        >
          <input
            onChange={handleChange}
            className="absolute cursor-pointer opacity-0 w-full h-full top-0 left-0"
            type="file"
          />
          <h3 className="text-slate-900">
            Drag and drop file here or
          </h3>
          <br />
          <label className="ml-2.5 mt-10 w-[183px] h-[44px] rounded-[21.5px] bg-red-600 py-2 px-4">
            Browse file
          </label>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;

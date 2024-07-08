"use client";

import Image from 'next/image';
import { useState } from 'react';

const ProductImages = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.thumbnail)

  const handleChangeImage = (url: string) => {
    setCurrentImage(url)
  }
  return (
    <>
      <Image className='w-[300px] h-[300px] object-cover' src={currentImage} alt={product.name} width={300} height={300} />
      <div className='mt-4 flex gap-4 flex-wrap'>
        <Image onClick={() => handleChangeImage(product.thumbnail)} className='w-[50px] h-[50px] object-cover' src={product.thumbnail} alt={product.name} width={50} height={50} />
        {product.images.map(image => (
          <Image onClick={() => handleChangeImage(image.secureUrl)} key={image.id} src={image.secureUrl} alt={image.id} height={50} width={50} className='w-[50px] h-[50px] object-cover hover:cursor-pointer' />
        ))}
      </div>
    </>
  )
}
export default ProductImages
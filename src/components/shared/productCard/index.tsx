import Image from "next/image";
import Link from 'next/link';

import AddToCart from "./AddToCart";
import { EyeIcon } from '@/icons';

const ProductCard = ({ product }) => {
  return (
    <article className="w-60 min-h-[400px] bg-white shadow-xl rounded-sm p-4 ">
      <header className="relative w-52 h-52 mx-auto">
        <Image
          src={product.thumbnail}
          alt={product.name}
          width={216}
          height={216}
          className="w-52 h-52 object-cover object-center"
        />
        <div className='absolute top-2 right-2 p-2 bg-purple-100 bg-opacity-40 rounded-full cursor-pointer'>
          <Link className='font-semibold' href={`/productos/${product.slug}`}><EyeIcon className='h-5 w-5 text-custom-primary' />
          </Link>

        </div>
      </header>
      <main>
        <div className='my-4'>
          <Link className='font-semibold' href={`/productos/${product.slug}`}>{product.name}
          </Link>
        </div>
        {/* <div>
        {product.prodAttributes.map((atrubuto) => {
          return <p key={atrubuto.id}>{atrubuto.name}</p>;
        })}
      </div> */}
        <p>Stock: {product.stock}</p>
        <p>Precio: {product.retailPrice}</p>
      </main>
      <footer className='w-full'>
        <AddToCart product={product} />
      </footer>
    </article >
  );
};

export default ProductCard;

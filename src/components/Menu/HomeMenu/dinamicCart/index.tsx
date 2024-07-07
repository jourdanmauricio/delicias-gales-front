"use client";
import AddToCart from '@/components/shared/productCard/AddToCart';
import CartIcon from "@/icons/cart";
import { useShopCartStore } from "@/store/shopCart.store";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from "react";

const DinamicCart = () => {
  const [prodQuantity, setProdQuantity] = useState(0);
  const [showShopCart, setShowShopCart] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const buttonCartRef = useRef<HTMLButtonElement>(null);
  const divCartRef = useRef<HTMLDivElement>(null);
  const products = useShopCartStore(state => state.products);

  useEffect(() => {
    setProdQuantity(products.length);
    const total = products.reduce((total, producto) => {
      return total + (producto.retailPrice * producto.quantity);
    }, 0)
    setTotalCart(total)
  }, [products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonCartRef.current &&
        !buttonCartRef.current.contains(event.target as Node) &&
        divCartRef.current &&
        !divCartRef.current.contains(event.target as Node)) {
        setShowShopCart(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [buttonCartRef]);

  const handleClick = () => {
    setShowShopCart(!showShopCart);
  }

  return (
    <div className='flex'>
      <button onClick={handleClick} ref={buttonCartRef}>
        <div className="relative p-2 rounded-full cursor-pointer hover:bg-purple-950/20">
          {prodQuantity > 0 &&
            <span className="w-5 h-5 flex justify-center items-center absolute -top-1 -right-1 bg-custom-primary text-custom-secondary rounded-full font-semibold text-sm">
              {prodQuantity}
            </span>
          }
          <CartIcon className="w-7 h-7" />
        </div>
      </button>

      {showShopCart && (
        <div className='absolute top-16 left-0 w-full h-[100vh] bg-black/50 backdrop-blur-sm'></div>
      )}

      <div ref={divCartRef} className={`absolute min-h-[100vh] w-full md:w-1/2 top-16 transition-left duration-500 ease bg-slate-50 text-slate-900 rounded ${showShopCart ? 'left-0' : '-left-full'}`}>

        <div className='m-4 overflow-y-scroll h-[80vh]'>
          {products.map(product => (
            <div key={product.id} className='flex items-center gap-4 mt-4'>
              <Image src={product.thumbnail} width={64} height={64} className='w-16 h-16 object-cover'
                alt={product.name} />
              <div className='flex flex-col text-sm'>
                <p>{product.name} - ${product.retailPrice} x {product.quantity}u = ${product.retailPrice * product.quantity}</p>
                <AddToCart product={product} />
                <hr className='border-b border-b-gray-900 mt-2' />
              </div>
            </div>
          ))}
          <p className='mt-8 text-center'>Total : {totalCart}</p>
          <Link href='/new-order' className='mt-8 btn btn-confirm text-center mx-auto block'>Finalizar compra</Link>
        </div>
      </div>
    </div>
  );
};

export default DinamicCart;

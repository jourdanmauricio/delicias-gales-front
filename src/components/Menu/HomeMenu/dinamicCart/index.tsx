"use client";
import Image from "next/image";
import Link from "next/link";

import AddToCart from "@/components/shared/productCard/AddToCart";
import { CartIcon } from "@/icons";
import ItemCar from "./itemCar";
import UseCar from "./useCar";

const DinamicCart = () => {
  const {
    prodQuantity,
    totalCart,
    showShopCart,
    handleClick,
    buttonCartRef,
    divCartRef,
    products,
  } = UseCar();
  return (
    <div className="flex">
      <button onClick={handleClick} ref={buttonCartRef}>
        <div className="relative p-2 rounded-full cursor-pointer hover:bg-purple-950/20">
          {prodQuantity > 0 && (
            <span className="w-5 h-5 flex justify-center items-center absolute -top-1 -right-1 bg-custom-primary text-custom-secondary rounded-full font-semibold text-sm">
              {prodQuantity}
            </span>
          )}
          <CartIcon className="w-7 h-7" />
        </div>
      </button>

      {showShopCart && (
        <div className="absolute top-16 left-0 w-full h-[100vh] bg-black/50 backdrop-blur-sm"></div>
      )}

      <div
        ref={divCartRef}
        className={`absolute min-h-[100vh] w-full md:w-1/2 top-16 transition-left duration-500 ease bg-slate-50 text-slate-900 rounded ${
          showShopCart ? "left-0" : "-left-full"
        }`}>
        <div className="m-4 overflow-y-scroll h-[80vh]">
          {products.map((product) => (
            <ItemCar product={product} key={product.id} />
            // <div key={product.id} className='flex items-center gap-4 mt-4'>
            //   <Image src={product.thumbnail} width={64} height={64} className='w-16 h-16 object-cover'
            //     alt={product.name} />
            //   <div className='flex flex-col text-sm'>
            //     <p>{product.name} - ${product.retailPrice} x {product.quantity}u = ${product.retailPrice * product.quantity}</p>
            //     <AddToCart product={product} />
            //     <hr className='border-b border-b-gray-900 mt-2' />
            //   </div>
            // </div>
          ))}
          <p className="mt-8 text-center">Total : {totalCart}</p>
          <Link
            href="/new-order"
            className="mt-8 btn btn-confirm text-center mx-auto block">
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DinamicCart;

"use client";
import { useShopCartStore } from "@/store/shopCart.store";
import { IProdCart } from '@/utils/types/products/IProdCart';
import { useEffect, useState } from "react";

const AddToCart = ({ product }) => {
  const [prodCart, setProdCart] = useState<IProdCart>({
    id: product.id,
    name: product.name,
    thumbnail: product.thumbnail,
    quantity: 0,
  });

  const setProducts = useShopCartStore(state => state.setProducts);
  const products = useShopCartStore(state => state.products);

  useEffect(() => {
    const prod = products.find((el) => el.id === product.id);
    const prodCart = {
      id: product.id,
      name: product.name,
      thumbnail: product.thumbnail,
      quantity: prod ? prod.quantity : 0,
    }
    setProdCart(prodCart)
  }, [product, products]);


  const handleChangeQuantity = (value) => {
    setProducts({ ...prodCart, quantity: Number(value) });
  };

  return (
    <div className='w-full pt-4'>
      {prodCart.quantity > 0 ? (
        <div className='flex justify-between gap-4'>
          <button onClick={() => handleChangeQuantity(+prodCart.quantity - 1)} type='button' className='btn btn-confirm'>-</button>
          <input
            type="text"
            className="input-form text-center"
            value={prodCart.quantity || 0}
            onChange={(e) => handleChangeQuantity(e.target.value)}
          />
          <button onClick={() => handleChangeQuantity(+prodCart.quantity + 1)} type='button' className='btn btn-confirm'>+</button>
        </div>

      ) : (
        <button
          onClick={() => handleChangeQuantity(1)}
          className="bg-red-600 text-white p-2 rounded mx-auto block">
          Agregar al carrito
        </button>
      )}

    </div>

  );
};

export default AddToCart;

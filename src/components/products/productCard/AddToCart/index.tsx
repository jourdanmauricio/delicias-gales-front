"use client";
import { useShopCarStore } from "@/store/shopcar.store";
import { useEffect, useState } from "react";

const AddToCart = ({ id }) => {
  const { setProducts, products } = useShopCarStore();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const product = products.find((element) => element.id === id);
    if (product) {
      setQuantity(product.quantity);
    }
  }, [products, id]);

  const handleAddToCart = () => {
    setProducts({ id, quantity: Number(quantity) });
    console.log("products", products);
  };
  const handleChangeQuantity = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };
  return (
    <>
      <div>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
        <input
          type="text"
          className="border w-6"
          value={quantity}
          onChange={handleChangeQuantity}
        />
        <button onClick={() => setQuantity(quantity - 1)}>-</button>
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-red-600 text-white p-2 rounded">
        Agregar al carrito
      </button>
    </>
  );
};

export default AddToCart;

import { useEffect, useRef, useState } from "react";

import { useShopCartStore } from "@/store/shopCart.store";

const UseCar = () => {
  const [prodQuantity, setProdQuantity] = useState(0);
  const [showShopCart, setShowShopCart] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const buttonCartRef = useRef<HTMLButtonElement>(null);
  const divCartRef = useRef<HTMLDivElement>(null);
  const { products, userId, setProducts } = useShopCartStore();
  useEffect(() => {
    setProdQuantity(products.length);
    const total = products.reduce((total, producto) => {
      return total + producto.retailPrice * producto.quantity;
    }, 0);
    setTotalCart(total);
  }, [products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonCartRef.current &&
        !buttonCartRef.current.contains(event.target as Node) &&
        divCartRef.current &&
        !divCartRef.current.contains(event.target as Node)
      ) {
        setShowShopCart(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [buttonCartRef]);

  const handleClick = () => {
    setShowShopCart(!showShopCart);
  };

  return {
    buttonCartRef,
    divCartRef,
    products,
    handleClick,
    showShopCart,
    totalCart,
    prodQuantity,
    userId,
    setProducts,  
  };
};

export default UseCar;

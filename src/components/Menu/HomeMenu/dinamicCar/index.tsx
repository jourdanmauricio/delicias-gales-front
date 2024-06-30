"use client";
import CartIcon from "@/icons/cart";
import { useShopCarStore } from "@/store/shopcar.store";
import Link from "next/link";
import { useEffect, useState } from "react";

const DinamicCar = () => {
  const [total, setTotal] = useState(0);
  const { products } = useShopCarStore();
  useEffect(() => {
    const total = products.reduce((acc, element) => acc + element.quantity, 0);
    setTotal(total);
  }, [products]);

  return (
    <Link href={"/ShopCar"}>
      <div className="p-2 flex flex-col justify-center items-center rounded-full cursor-pointer hover:bg-purple-950/20">
        <p className="font-semibold text-sm">{total}</p>
        <CartIcon className="w-7 h-7" />
      </div>
    </Link>
  );
};

export default DinamicCar;

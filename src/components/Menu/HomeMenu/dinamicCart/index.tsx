"use client";
import CartIcon from "@/icons/cart";
import { useShopCartStore } from "@/store/shopCart.store";
import Link from "next/link";
import { useEffect, useState } from "react";

const DinamicCart = () => {
  const [total, setTotal] = useState(0);
  const products = useShopCartStore(state => state.products);

  useEffect(() => {
    setTotal(products.length);
  }, [products]);

  return (
    <Link href={"/shopCart"}>
      <div className="relative p-2 rounded-full cursor-pointer hover:bg-purple-950/20">
        {total > 0 &&
          <span className="w-5 h-5 flex justify-center items-center absolute -top-1 -right-1 bg-custom-primary text-custom-secondary rounded-full font-semibold text-sm">
            {total}
          </span>
        }
        <CartIcon className="w-7 h-7" />
      </div>
    </Link >
  );
};

export default DinamicCart;

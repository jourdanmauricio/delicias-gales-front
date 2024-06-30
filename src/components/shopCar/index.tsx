"use client";
import { useShopCarStore } from "@/store/shopcar.store";
import getProducts from "@/utils/api/products/getProducts";
import { useEffect, useState } from "react";
import ShopCarItem from "./shopCarItem";

const ShopCar = () => {
  const [productList, setProductList] = useState([]);
  const { products } = useShopCarStore();

  const getData = async () => {
    const data = await getProducts();
    const ListCar = data.map((product) => {
      products.find((element) => {
        if (element.id === product.id) {
          return {
            id: product.id,
            name: product.name,
            price: product.originalPrice,
            image: product.thumbnail,
            quantity: element.quantity,
          };
        }
      });
    });

    setProductList(ListCar);
  };

  useEffect(() => {
    getData();
  }, [products]);

  return (
    <div>
      {productList.map((product) => (
        <ShopCarItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ShopCar;

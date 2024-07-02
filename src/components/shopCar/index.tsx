"use client";
import { useShopCarStore } from "@/store/shopcar.store";
import getProducts from "@/utils/api/products/getProducts";
import { useEffect, useState } from "react";
import ShopCarItem from "./shopCarItem";
import newOrder from "@/utils/api/orders/newOrder";
import GetOrder from "@/utils/api/orders/getOrders";

const ShopCar = () => {
  const [productList, setProductList] = useState([]);
  const { products, userId } = useShopCarStore();

  const sendOrder = async () => {
    await newOrder({ products, userId });
  };
  const getOrder = async () => {
    const order = await GetOrder();
    console.log("order", order);
  };

  const getData = async () => {
    const data = await getProducts();
    const ListCar = data
      .map((product) => {
        console.log("product", product);

        const matchedProduct = products.find(
          (element) => element.id === product.id
        );

        if (matchedProduct) {
          return {
            id: product.id,
            name: product.name,
            price: product.originalPrice,
            image: product.thumbnail,
            quantity: matchedProduct.quantity,
          };
        }
      })
      .filter(Boolean); // Filtra los valores undefined

    setProductList(ListCar);
  };

  useEffect(() => {
    getData();
  }, [products]);

  return (
    <div>
      <div>
        {productList &&
          productList.map((product) => (
            <ShopCarItem key={product.id} product={product} />
          ))}
      </div>
      <button
        onClick={sendOrder}
        className="bg-red-500 text-white px-4 py-2 rounded-md">
        enviar pedido
      </button>
    </div>
  );
};

export default ShopCar;

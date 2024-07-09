"use client";
import ItemCar from "../Menu/HomeMenu/dinamicCart/itemCar";
import { useShopCartStore } from "@/store/shopCart.store";

const NewOrder = () => {
  const { products } = useShopCartStore();

  return (
    <div className="pt-8 flex gap-8 justify-center ">
      <div>
        <h1 className="text-xl">Mi carrito</h1>
        <div className="border-t border-gray-950">
          {products.map((product) => (
            <ItemCar product={product} key={product.id} />
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-xl">resumen del pedido</h1>
        <div className="border-t border-gray-950 py-4">
          <div className="flex justify-between mb-2">
            <p>Subtotal</p>
            <p>$5000</p>
          </div>
          <div className="flex justify-between">
            <p>Envio</p>
            <p>$1000</p>
          </div>
        </div>
        <div className="border-t border-gray-950 py-6">
          <div className="flex justify-between">
            <p>Total</p>
            <p>$5000</p>
          </div>
        </div>

        <button className="border border-gray-950 px-4 py-2 w-full">
          Ir a pagar
        </button>
      </div>
    </div>
  );
};
export default NewOrder;

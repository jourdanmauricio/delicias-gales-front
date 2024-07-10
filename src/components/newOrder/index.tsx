"use client";
import newOrder from "@/utils/api/orders/newOrder";
import ItemCar from "../Menu/HomeMenu/dinamicCart/itemCar";
import UseCar from "../Menu/HomeMenu/dinamicCart/useCar";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
const NewOrder = () => {
  const { products, totalCart, userId, setProducts } = UseCar();
  const domicilio = 225;
  const router = useRouter();
  const sendOrder = async () => {
    const listProducts = products.map((product) => ({
      id: product.id,
      quantity: product.quantity,
    }));
    if (userId) {
      const response = await newOrder({ products: listProducts, userId });
      console.log("response", response);
      Swal.fire({
        icon: "success",
        title: "su pedido se genero con el id " + response.id,
        showConfirmButton: false,
        width: "450px",
        timer: 1500,
      });
      setProducts(null);

      return;
    }
    Swal.fire({
      icon: "success",
      title: "aun no te encuentras logueado, te redirecionaremos al login",
      showConfirmButton: false,
      width: "450px",
      timer: 1500,
    });
    router.push("/login");
  };

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
            <p>${totalCart}</p>
          </div>
          <div className="flex justify-between">
            <p>Envio</p>
            <p>${domicilio}</p>
          </div>
        </div>
        <div className="border-t border-gray-950 py-6">
          <div className="flex justify-between">
            <p>Total</p>
            <p>${totalCart + domicilio}</p>
          </div>
        </div>

        <button onClick={sendOrder} className="btn btn-confirm w-full">
          Ir a pagar
        </button>
      </div>
    </div>
  );
};
export default NewOrder;

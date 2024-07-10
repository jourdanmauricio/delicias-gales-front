import Image from "next/image";
import AddToCart from "@/components/shared/productCard/AddToCart";

const ItemCar = ({ product }) => {
  return (
    <>
      <div key={product.id} className="flex items-center gap-4 mt-4">
        <Image
          src={product.thumbnail}
          width={64}
          height={64}
          className="w-16 h-16 object-cover"
          alt={product.name}
        />
        <div className="flex flex-col text-sm">
          <p>
            {product.name} - ${product.retailPrice} x {product.quantity}u = $
            {product.retailPrice * product.quantity}
          </p>
          <AddToCart product={product} />
          <hr className="border-b border-b-gray-900 mt-2" />
        </div>
      </div>
    </>
  );
};

export default ItemCar;

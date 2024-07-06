import Image from "next/image";
import AddToCart from "./AddToCart";

const ProductCard = ({ product }) => {
  return (
    <div className="w-60 bg-white shadow-xl rounded-sm p-4 ">
      <div className="relative w-52 h-52 mx-auto">
        <Image
          src={product.thumbnail}
          alt={product.name}
          width={216}
          height={216}
          className="w-52 h-52 object-cover object-center"
        />
      </div>
      <p>{product.name}</p>
      <div>
        {product.prodAttributes.map((atrubuto) => {
          return <p key={atrubuto.id}>{atrubuto.name}</p>;
        })}
      </div>
      <p>Stock: {product.stock}</p>
      <p>Precio: {product.retailPrice}</p>
      <div className='w-full'>
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;

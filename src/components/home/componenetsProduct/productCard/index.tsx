import Image from "next/image";
import AddToCart from "./AddToCart";

const ProductCard = ({ id, name, thumbnail, stock, prodAttributes }) => {
  return (
    <div className="w-60 bg-white shadow-xl rounded-sm p-4 ">
      <div className="relative w-52 h-52 mx-auto">
        <Image
          src={thumbnail}
          alt={name}
          // layout="fill"
          // objectFit="cover"
          width={216}
          height={216}
          className="w-52 h-52 object-cover object-center"
        />
      </div>
      <p>{name}</p>
      <div>
        {prodAttributes.map((atrubuto) => {
          return <p key={atrubuto.id}>{atrubuto.name}</p>;
        })}
      </div>
      <p>Stock: {stock}</p>
      <AddToCart id={id} />
    </div>
  );
};

export default ProductCard;

import Image from "next/image";

const ProductCard = ({ id, name, thumbnail, stock, prodAttributes }) => {
  return (
    <div className="w-60 bg-white shadow-xl rounded-sm p-4 ">
      <div className="relative w-52 h-52 mx-auto">
        <Image
          src={thumbnail}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-sm"
        />
      </div>
      <p>{name}</p>
      <div>
        {prodAttributes.map((atrubuto) => {
          return <p key={atrubuto.id}>{atrubuto.name}</p>;
        })}
      </div>
      <div>
        <button>+</button>
        <input type="text" className="border w-6" />
        <button>-</button>
      </div>
      <p>Stock: {stock}</p>
      <button className="bg-red-600 text-white p-2 rounded">
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;

import Image from "next/image";

const CategoryCard = ({ id, name, image, productCount }) => {
  return (
    <div className="rounded-md p-4 bg-white duration-500 hover:scale-105 shadow-md ">
      <h2>{name}</h2>
      <div className="relative w-52 h-52 rounded-full overflow-hidden mx-auto">
        <Image
          src={image}
          alt={id}
          // layout="fill" // Usar layout fill para llenar el contenedor
          // objectFit="cover" // Ajustar la imagen para cubrir el contenedor
          width={216}
          height={216}
          className="w-52 h-52 object-cover object-center"
        />
      </div>
      <p>Cantidad de productos: {productCount}</p>
    </div>
  );
};

export default CategoryCard;

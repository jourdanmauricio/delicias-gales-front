import Image from "next/image";
import Link from "next/link";

const BrandCard = ({ image, id, name }) => {
  return (
    <div className="flex flex-col justify-between rounded-md p-4 bg-white duration-500  hover:scale-105 shadow-md ">
      <h2>{name}</h2>
      <div className="mx-auto">
        <Link href={`/products?brand=${id}`}>
          <Image src={image} alt={id} width={150} height={150} />
        </Link>
      </div>
      <Link
        href={`/products?brand=${id}`}
        className="btn btn-confirm block mt-4 mx-auto text-center">
        Ver Productos
      </Link>
    </div>
  );
};

export default BrandCard;

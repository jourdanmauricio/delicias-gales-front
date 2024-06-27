import Image from "next/image";
import Link from "next/link";

const BrandCard = ({ image, id, name }) => {
  return (
    <div className=" rounded-md p-4 bg-white duration-500  hover:scale-105 shadow-md ">
      <h2>{name}</h2>
      <Link href={"/"}>
        <Image src={image} alt={id} width={200} height={200} />
      </Link>
    </div>
  );
};

export default BrandCard;

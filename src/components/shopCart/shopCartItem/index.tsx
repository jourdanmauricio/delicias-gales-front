import Image from "next/image";

const ShopCartItem = ({ product }) => {
  const { id, name, price, image, quantity } = product;
  return (
    <div className="border flex gap-4 p-4 bg-white rounded-md my-8 mx-4">
      <div className="">
        <Image src={image} alt={id} width={100} height={200} />
      </div>
      <div>
        <h2>{name}</h2>
        <div>
          <button>+</button>
          <input type="text" value={quantity} />
          <button>-</button>
        </div>
      </div>
      <div>
        <h2>{price}</h2>
        <h3></h3>
      </div>
    </div>
  );
};

export default ShopCartItem;

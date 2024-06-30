import Image from "next/image";

const ShopCarItem = ({ product }) => {
  const { id, name, price, image, quantity } = product;
  return (
    <div>
      <div>
        <Image src={image} alt={id} width={200} height={200} />
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

export default ShopCarItem;

import ProductCard from "../productCard";

const ProductContentHome = ({ products }) => {

  return (
    <div className="mb-16">
      <h1 className="text-3xl font-bold text-center mb-9">
        Productos Destacados
      </h1>
      <div className="flex justify-center items-center gap-4">
        <div className="text-3xl font-bold ">&lt;</div>
        <div className="flex gap-4 ">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <div className="text-3xl font-bold">&gt;</div>
      </div>
    </div>
  );
};

export default ProductContentHome;

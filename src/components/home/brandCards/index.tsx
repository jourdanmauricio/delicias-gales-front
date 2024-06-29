import BrandCard from "./brandCard";

const BrandCards = async ({ brands }) => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-9">Nuestras Marcas</h2>
      <div className="flex gap-4 justify-center">
        {brands.map((brand) => {
          return (
            <BrandCard
              key={brand.id}
              image={brand.image}
              id={brand.id}
              name={brand.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BrandCards;

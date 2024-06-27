import getBrands from "@/utils/api/brands/getBrands";
import BrandCard from "./brandCard";

const BrandCards = async () => {
  const getData = async () => {
    const data = await getBrands();
    return data;
  };

  const data = await getData();

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-9">Nuestras Marcas</h2>
      <div className="flex gap-4 justify-center">
        {data.map((brand) => {
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

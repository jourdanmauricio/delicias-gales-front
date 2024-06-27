import getCategories from "@/utils/api/categories/getCategories";
import CategoryCard from "./categoryCard";

const CategoriesCards = async () => {
  const getData = async () => {
    const data = await getCategories();
    return data;
  };

  const data = await getData();

  return (
    <div className="mb-16">
      <h1 className="text-3xl font-bold text-center my-9">
        Nuestras Categorias
      </h1>
      <div className="flex gap-4 justify-center">
        {data.map((category) => {
          return (
            <CategoryCard
              key={category.id}
              image={category.image}
              id={category.id}
              name={category.name}
              productCount={category.productCount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesCards;

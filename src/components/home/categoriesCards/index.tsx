import CategoryCard from "./categoryCard";

const CategoriesCards = async ({ categories }) => {

  return (
    <div className="mb-16">
      <h1 className="text-3xl font-bold text-center my-9">
        Nuestras Categorias
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          category.show &&
          <CategoryCard
            key={category.id}
            image={category.image}
            id={category.id}
            name={category.name}
            productCount={category.productCount}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesCards;

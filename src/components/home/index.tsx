import ProductContentHome from "./componenetsProduct/productHome";
import BrandCards from "./brandCards";
import CategoriesCards from "./categoriesCards";
import getCategories from '@/utils/api/categories/getCategories';
import getCategory from '@/utils/api/categories/getCategory';
import getBrands from '@/utils/api/brands/getBrands';

const Home = async () => {

  const categories = await getCategories()
  const catFeatured = categories.find(el => el.name === "Destacados")
  const featuredProducts = await getCategory(catFeatured.id)

  const brands = await getBrands();

  return (
    <div>
      <CategoriesCards categories={categories} />
      <BrandCards brands={brands} />
      <ProductContentHome products={featuredProducts.products} />
    </div>
  );
};

export default Home;

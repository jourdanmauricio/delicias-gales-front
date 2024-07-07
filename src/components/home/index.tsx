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
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1'>
        <CategoriesCards categories={categories} />
        <BrandCards brands={brands} />
        <ProductContentHome products={featuredProducts.products} />
      </main>
    </div>
  );
};

export default Home;

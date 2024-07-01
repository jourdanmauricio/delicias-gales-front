import getProducts from '@/utils/api/products/getProducts';
import ProductsList from './ProductsList';
import getCategories from '@/utils/api/categories/getCategories';
import getBrands from '@/utils/api/brands/getBrands';

const Products = async ({ searchParams }: { searchParams: { category: string, brand: string } }) => {

  const { category, brand } = searchParams;
  const prods = await getProducts();
  const respCategories = await getCategories();
  const categories = respCategories.filter(cat => cat.show === true)
  const brands = await getBrands();
  let filterProds = prods;
  console.log("categoryParam", category);

  if (category) {
    filterProds = prods.filter(product => product.categoriesIds.includes(category));
  }

  if (brand) {
    filterProds = prods.filter(product => product.brandId === brand);
  }

  return (
    <>
      <ProductsList prods={prods} filterProds={filterProds} categories={categories} cat={category} brands={brands} brand={brand} />
    </>
  )
}
export default Products
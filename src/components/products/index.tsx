import getProducts from '@/utils/api/products/getProducts';
import ProductsList from './ProductsList';
import getCategories from '@/utils/api/categories/getCategories';
import getBrands from '@/utils/api/brands/getBrands';

const Products = async ({ searchParams }: { searchParams: { category: string } }) => {

  const categoryParam = searchParams.category;
  const prods = await getProducts();
  const respCategories = await getCategories();
  const categories = respCategories.filter(cat => cat.show === true)
  const brands = await getBrands();
  console.log("categoryParam", categoryParam);

  return (
    <>
      <ProductsList prods={prods} categories={categories} cat={categoryParam} brands={brands} />
    </>
  )
}
export default Products
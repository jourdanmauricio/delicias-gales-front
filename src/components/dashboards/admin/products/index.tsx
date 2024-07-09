import getProducts from '@/utils/api/products/getProducts'
import ProductsTable from './ProductsTable/ProductsTable';
import getCategories from '@/utils/api/categories/getCategories';
import getBrands from '@/utils/api/brands/getBrands';

const Products = async () => {
  const products = await getProducts();
  const categories = await getCategories();
  const brands = await getBrands();

  return (
    <ProductsTable products={products} categories={categories} brands={brands} />
  )
}
export default Products
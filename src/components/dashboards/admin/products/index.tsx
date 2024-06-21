import getProducts from '@/utils/api/products/getProducts'
import ProductsTable from './ProductsTable/ProductsTable';

const Products = async () => {
  const products = await getProducts();

  console.log("products", products)
  return (
    <ProductsTable products={products} />
  )
}
export default Products
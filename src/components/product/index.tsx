import AddToCart from '../shared/productCard/AddToCart'
import ProductImages from './ProductImages'
import getProductBySlug from '@/utils/api/products/getProductBySlug'

const Product = async ({ params }: { params: { slug: string } }) => {

  const product = await getProductBySlug(params.slug);

  console.log("product", product)

  return (
    <div className='w-full flex gap-4 mt-8 flex-col md:flex-row container mx-auto justify-center min-h-screen'>
      <div className='flex flex-col items-center w-full md:w-1/2'>
        <ProductImages product={product} />
      </div>

      <div className='flex flex-col px-8 md:p-0 w-full md:w-1/2'>
        <h1 className='font-semibold'>{product.name}</h1>
        <p className='mt-8'>{product.description}</p>
        <p className='mt-4'>Código: {product.cod}</p>
        <p>Marca: {product.brand.name}</p>
        <p className=''>Precio: ${product.retailPrice}</p>
        <AddToCart product={product} />

        <p className='mt-4'>Características:</p>
        <table className='table mt-4'>
          <thead>
            <tr>
              <th>Atributo</th>
              <th>Valor</th>
              <th>Unidad</th>
            </tr>
          </thead>
          <tbody>
            {product.prodAttributes.map(attrib => (
              <tr key={attrib.id}>
                <td>{attrib.name}</td>
                <td>{attrib.value}</td>
                <td>{attrib.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div >
  )
}
export default Product
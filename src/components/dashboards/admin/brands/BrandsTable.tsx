import DeleteBranch from './deleteBrand/DeleteBrand'
import EditBrand from './editBrand/EditBrand'

const BrandsTable = ({ brands }) => {

  return (
    <table className="mt-8 min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr>
          <th className="py-3 px-4 bg-gray-50 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Nombre</th>
          <th className="py-3 px-4 bg-gray-50 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Productos</th>
          <th className="py-3 px-4 bg-gray-50 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {brands.map((brand) => (
          <tr key={brand.id} className="hover:bg-gray-100 text-center">
            <td className="py-2 px-4 border-b border-gray-300">{brand.name}</td>
            <td className="py-2 px-4 border-b border-gray-300">{brand.productCount}</td>
            <td className="py-2 px-4 border-b border-gray-300 flex justify-center gap-2 sm:gap-4">
              <EditBrand brand={brand} />
              <DeleteBranch brand={brand} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default BrandsTable
import DeleteAttribute from './deleteAttribute/DeleteBrand'
import EditAttribute from './editAttribute/EditAttribute'

const AttributesTable = ({ attributes }) => {

  return (
    <table className="mt-8 min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr>
          <th className="py-3 px-4 bg-gray-50 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Nombre</th>
          <th className="py-3 px-4 bg-gray-50 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Unidad</th>
          <th className="py-3 px-4 bg-gray-50 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {attributes.map((attribute) => (
          <tr key={attribute.id} className="hover:bg-gray-100 text-center">
            <td className="py-2 px-4 border-b border-gray-300">{attribute.name}</td>
            <td className="py-2 px-4 border-b border-gray-300">{attribute.unitDefault}</td>
            <td className="py-2 px-4 border-b border-gray-300 flex justify-center gap-2 sm:gap-4">
              <EditAttribute attribute={attribute} />
              <DeleteAttribute attribute={attribute} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default AttributesTable
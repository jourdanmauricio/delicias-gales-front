import CircleButton from '@/components/shared/CircleButton'
import EditIcon from '@/icons/edit'
import TrashIcon from '@/icons/trash'
import getCategories from '@/utils/api/categories/getCategories'
import Image from 'next/image'
import Link from 'next/link'
import DeleteCategory from './editCatgegory/DeleteCategory'

const Categories = async () => {
  const categories = await getCategories()

  return (
    <>
      <header className='pt-16 flex justify-between'>
        <h2>Categorías</h2>
        <Link href='categories/new' className='btn btn-confirm'>Nueva</Link>
      </header>

      <section className='pt-16 "max-w-[1024px] my-0 mx-auto flex items-center justify-center gap-8 flex-wrap'>
        {categories.map((category) =>
          <article key={category.id} className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden min-w-[250px] w-full">
            <Image width={200} height={250} className="w-full h-48 object-cover" src={category.image} alt="Product Thumbnail" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{category.name}</h2>
              <p className="text-gray-700 text-base mb-4 line-clamp-3 min-h-[4.5rem]">
                {category.description}
              </p>
              <p className='text-gray-700'>Cantidad de productos: {category.productCount}</p>
              <div className="flex items-center gap-4 justify-end">
                <DeleteCategory categoryId={category.id} totalProducts={category.productCount} />
                <Link href={`categories/${category.id}`}>
                  <CircleButton className="p-2 rounded-full cursor-pointer bg-purple-200  hover:bg-purple-950/20">
                    <EditIcon className="w-6 h-6 text-blue-950" />
                  </CircleButton>
                </Link>
              </div>
            </div>
          </article>
        )}

      </section>
    </>

  )
}
export default Categories
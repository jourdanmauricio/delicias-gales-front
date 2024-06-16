import getCategory from '@/utils/api/categories/getCategory';
import Link from 'next/link'
import EditCategoryForm from './EditCategoryForm';

const EditCategoria = async ({ params }: { params: { id: string } }) => {

  const id = params.id;
  let category = null

  if (params.id !== 'new') {
    category = await getCategory(id);
  }

  return (
    <>
      <header className='pt-16'>
        <Link href="./../categories">Categorías</Link> / {params.id === 'new' ? 'Nueva' : 'Modificar'}
      </header>
      <EditCategoryForm category={category} />
    </>
  )
}
export default EditCategoria
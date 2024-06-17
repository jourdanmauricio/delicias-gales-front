import getAttributes from '@/utils/api/attributes/getAttributes';
import NewAttribute from './newAttribute/NewAttribute';
import AttributesTable from './AttributesTable';

const Attributes = async () => {
  const attributes = await getAttributes();

  return (
    <>
      <header className='pt-16 flex justify-between'>
        <h2>Atributos</h2>
        <NewAttribute />
      </header>
      <AttributesTable attributes={attributes} />
    </>
  )
}
export default Attributes
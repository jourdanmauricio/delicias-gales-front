"use client";
import useNewBrand from './useNewAttribute';

const NewAttribute = () => {
  const { handleNew } = useNewBrand()
  return (
    <button onClick={handleNew} className='btn btn-confirm'>Nuevo</button>
  )
}
export default NewAttribute
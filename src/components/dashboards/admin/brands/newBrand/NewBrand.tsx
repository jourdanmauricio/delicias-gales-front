"use client";
import useNewBrand from './useNewBrand';

const NewBrand = () => {
  const { handleNew } = useNewBrand()
  return (
    <button onClick={handleNew} className='btn btn-confirm'>Nueva</button>
  )
}
export default NewBrand
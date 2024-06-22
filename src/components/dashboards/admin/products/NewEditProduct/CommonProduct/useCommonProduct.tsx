import { useProductStore } from '@/store/product.store'
import { useState } from 'react';

const useCommonProduct = () => {
  const [errors, setErrors] = useState<any>({});
  const { product, updProduct } = useProductStore(state => state)

  const handleChange = (name, value) => {
    updProduct(name, value)
  }

  return { product, handleChange, errors }
}
export default useCommonProduct
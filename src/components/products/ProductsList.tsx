"use client";

import { useMemo, useState } from 'react';
import ProductCard from './productCard';
import { useDebounce } from '@/hooks/useDebounce';

const ProductsList = ({ prods, cat, categories, brands, filterProds, brand }) => {

  const [filters, setFilters] = useState({
    category: cat,
    brand: brand,
    text: ''
  });

  const [filteredProds, setFilteredProds] = useState(filterProds)

  const handleChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const debouncedText = useDebounce(filters.text, 300);

  const filteredProducts = useMemo(() => {
    let filtered = prods;

    if (filters.category) {
      filtered = filtered.filter(product => product.categoriesIds.includes(filters.category));
    }

    if (filters.brand) {
      filtered = filtered.filter(product => product.brandId === filters.brand);
    }

    if (debouncedText) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(debouncedText.toLowerCase())
      );
    }

    setFilteredProds(filtered)
  }, [filters.category, filters.brand, debouncedText, prods]);

  return (
    <main className='m-8'>
      <header className='flex justify-between items-center border rounded border-gray-800 p-4 gap-4'>
        <div className="relative w-1/3">
          <label className="label-form" htmlFor='text'>Buscar:</label>
          <input
            id='text'
            name="text"
            type="text"
            className="input-form"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={filters.text}
          />
        </div>

        <div className="relative w-1/3">
          <label className="label-form" htmlFor='category'>Categoría:</label>
          <div className="">
            <select
              id="category"
              name="category"
              className="input-form"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={filters.category}
            >
              <option value=''></option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative w-1/3">
          <label className="label-form" htmlFor='brand'>Marca:</label>
          <div className="">
            <select
              id="brand"
              name="brand"
              className="input-form"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={filters.brand}
            >
              <option value=''></option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

      </header>

      <div className="mt-4 flex flex-wrap gap-4 mx-auto justify-center">
        {filteredProds.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </main>

  )
}
export default ProductsList
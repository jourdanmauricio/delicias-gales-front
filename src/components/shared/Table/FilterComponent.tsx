import CloseSquareIcon from '@/icons/closeSquare';

export const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className='relative'>
    <input
      className="input-form"
      id='search'
      type='text'
      placeholder='Filtrar...'
      aria-label='Search Input'
      value={filterText}
      onChange={onFilter}
      onBlur={onFilter}
    />
    <button className="absolute right-2 top-2" type='button' onClick={onClear}>
      <CloseSquareIcon className='w-6 h-6 text-purple-700' />
    </button>
  </div>
);
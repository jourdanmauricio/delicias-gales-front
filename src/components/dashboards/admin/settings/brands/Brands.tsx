import { Actions } from '@/utils/types/tables/actions.enum';
import useBrands from './useBrands'
import DataTable from 'react-data-table-component';
import { paginationOptions } from '@/utils/types/tables/PaginationOptions';
import NewEditBrand from './newEditBrands/NewEditBrand';

const Brands = ({ allBrands }) => {

  const { brands, columns, currentData, actionsMenu, action, rowExpand, expandRow, ExpandedComponent, handleRefresh, handleCancel } = useBrands({ allBrands });

  console.log("AllBrands", allBrands)

  return (
    <>
      <div className='text-sm mt-4 ml-4'>
        {action !== Actions.VIEW && <button onClick={handleCancel}>Marcas</button>}
        {action === Actions.NEW && ' / Nueva'}
        {action === Actions.EDIT && ' / Modificar'}
      </div>

      {action === Actions.VIEW && (
        < DataTable
          dense
          title='Marcas'
          actions={actionsMenu}
          columns={columns}
          data={brands}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          expandableRowExpanded={row => row === rowExpand}
          onRowExpandToggled={(bool, row) => expandRow(bool, row)}
          pagination
          paginationComponentOptions={paginationOptions}
        />
      )}
      {(action === Actions.NEW || action === Actions.EDIT) && (
        <NewEditBrand brand={currentData} handleCancel={handleCancel} handleRefresh={handleRefresh} action={action} />
      )}
    </>
  )
}
export default Brands
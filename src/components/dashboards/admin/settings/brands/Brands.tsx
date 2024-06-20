import { Actions } from '@/utils/types/tables/actions.enum';
import useBrands from './useBrands'
import DataTable from 'react-data-table-component';
import { TableLoader } from '@/components/shared/Table/TableLoader';
import { paginationOptions } from '@/utils/types/tables/PaginationOptions';

const Brands = () => {

  const { brands, currentData, columns, actionsMenu, action, pending, handleCancel } = useBrands();

  return (
    <>
      <div className='text-sm mt-4 ml-4'>
        {action !== Actions.VIEW && <button onClick={handleCancel}>Marcas</button>}
        {action === Actions.NEW && ' / Nueva'}
        {action === Actions.EDIT && ' / Modificar'}
      </div>

      < DataTable
        dense
        title='Marcas'
        actions={actionsMenu}
        columns={columns}
        data={brands}
        expandableRows
        progressPending={pending}
        progressComponent={<TableLoader />}
        // expandableRowsComponent={ExpandedComponent}
        pagination
        paginationComponentOptions={paginationOptions}
      />
    </>
  )
}
export default Brands
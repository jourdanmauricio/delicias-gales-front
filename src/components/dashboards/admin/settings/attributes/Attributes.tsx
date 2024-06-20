import { Actions } from '@/utils/types/tables/actions.enum';
import DataTable from 'react-data-table-component';
import { TableLoader } from '@/components/shared/Table/TableLoader';
import { paginationOptions } from '@/utils/types/tables/PaginationOptions';
import useAttributes from './useAttributes';

const Attributes = () => {

  const { attributes, currentData, columns, actionsMenu, action, pending, handleCancel } = useAttributes();

  return (
    <>
      <div className='text-sm mt-4 ml-4'>
        {action !== Actions.VIEW && <button onClick={handleCancel}>Atributos</button>}
        {action === Actions.NEW && ' / Nueva'}
        {action === Actions.EDIT && ' / Modificar'}
      </div>

      < DataTable
        dense
        title='Atributos'
        actions={actionsMenu}
        columns={columns}
        data={attributes}
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
export default Attributes
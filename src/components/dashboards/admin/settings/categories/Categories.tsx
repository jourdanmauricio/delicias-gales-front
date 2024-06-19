"use client";

import DataTable from 'react-data-table-component';

import { TableLoader } from '@/components/shared/Table/TableLoader';
import { paginationOptions } from '@/utils/types/tables/PaginationOptions';
import useCategories from './useCategories';
import NewEditCategory from './newEditCategory/NewEditCategory';
import { Actions } from '@/utils/types/tables/actions.enum';


const Categories = () => {
  const { categories, currentData, columns, actionsMenu, action, pending, handleCancel, handleRefresh } = useCategories();

  return (
    <>
      <div className='text-sm mt-4'>
        <button onClick={handleCancel}>Categorías</button>
        {action === Actions.NEW && ' / Nueva'}
        {action === Actions.EDIT && ' / Modificar'}
      </div>

      {/* {action === Actions.VIEW && ( */}
      < DataTable
        //dense
        title='Categorías'
        actions={actionsMenu}
        columns={columns}
        data={categories}
        expandableRows
        progressPending={pending}
        progressComponent={<TableLoader />}
        // expandableRowsComponent={ExpandedComponent}
        pagination
        paginationComponentOptions={paginationOptions}
      />
      {/* )} */}

      {(action === Actions.NEW || action === Actions.EDIT) && (
        <NewEditCategory category={currentData} handleCancel={handleCancel} handleRefresh={handleRefresh} action={action} />
      )}

    </>

  )
}
export default Categories
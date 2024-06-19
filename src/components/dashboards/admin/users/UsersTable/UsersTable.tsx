"use client";

import DataTable from 'react-data-table-component';
import useUsersTable from './useUsersTable';
import NewEditUser from '../NewEditUser/NewEditUser';
import { paginationOptions } from '@/utils/types/tables/PaginationOptions';

const UsersTable = ({ users }) => {
  const { columns, action, ExpandedComponent, hadleSubmit, handleCancel, currentData, loading, errors, handleChange, filteredItems, subHeaderComponentMemo } = useUsersTable({ users });
  return (<>
    {action === 'VIEW' &&
      < DataTable
        //dense
        title='Usuarios'
        actions={subHeaderComponentMemo}
        columns={columns}
        data={filteredItems}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        pagination
        paginationComponentOptions={paginationOptions}
      />
    }
    {(action === 'NEW' || action === 'EDIT') && (
      <NewEditUser
        loading={loading}
        errors={errors}
        handleChange={handleChange}
        currentData={currentData}
        action={action}
        hadleSubmit={hadleSubmit}
        handleCancel={handleCancel}
      />
    )}
  </>
  )
}
export default UsersTable
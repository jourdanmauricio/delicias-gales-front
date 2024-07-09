"use client";

import DataTable from 'react-data-table-component';
import useUsersTable from './useUsersTable';
import NewEditUser from '../NewEditUser/NewEditUser';
import { paginationOptions } from '@/utils/types/tables/PaginationOptions';

const UsersTable = ({ users }) => {
  const { columns, action, rowExpand, currentData, loading, errors, filteredItems, subHeaderComponentMemo, sellers, ExpandedComponent, hadleSubmit, handleCancel, handleChange, expandRow } = useUsersTable({ users });
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
        expandableRowExpanded={row => row === rowExpand}
        onRowExpandToggled={(bool, row) => expandRow(bool, row)}
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
        sellers={sellers}
      />
    )}
  </>
  )
}
export default UsersTable
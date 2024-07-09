"use client";

import DataTable from 'react-data-table-component';

import { paginationOptions } from '@/utils/types/tables/PaginationOptions';
import useProductsTable from './useProductsTable';
import NewEditProduct from '../NewEditProduct/NewEditProduct';
import { Actions } from '@/utils/types/tables/actions.enum';
import ExpandedComponent from './ExpandedComponent';

const ProductsTable = ({ products, categories, brands }) => {
  const { columns, action, rowExpand, filteredItems, subHeaderComponentMemo, handleChangeData, expandRow, handleDelete, onEdit } = useProductsTable({ products });

  return (<>
    {action === Actions.VIEW &&
      < DataTable
        //dense
        title='Productos'
        actions={subHeaderComponentMemo}
        columns={columns}
        data={filteredItems}
        expandableRows
        expandableRowsComponent={(row) => ExpandedComponent({ row, handleDelete, onEdit, brands, categories })}
        expandableRowExpanded={row => row === rowExpand}
        onRowExpandToggled={(bool, row) => expandRow(bool, row)}
        pagination
        paginationComponentOptions={paginationOptions}
      />
    }
    {(action === Actions.NEW || action === Actions.EDIT) && (
      <NewEditProduct handleChangeData={handleChangeData} />
    )}
  </>
  )
}
export default ProductsTable
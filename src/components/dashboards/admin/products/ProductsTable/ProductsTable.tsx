"use client";

import DataTable from 'react-data-table-component';
import { paginationOptions } from '@/utils/types/tables/PaginationOptions';
import useProductsTable from './useProductsTable';
import NewEditProduct from '../NewEditProduct/NewEditProduct';
import { Actions } from '@/utils/types/tables/actions.enum';

const ProductsTable = ({ products, categories, brands }) => {
  const { columns, action, rowExpand, filteredItems, subHeaderComponentMemo, handleChangeData, expandRow, ExpandedComponent } = useProductsTable({ products, categories, brands });

  return (<>
    {action === Actions.VIEW &&
      < DataTable
        //dense
        title='Productos'
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
    {(action === Actions.NEW || action === Actions.EDIT) && (
      <NewEditProduct handleChangeData={handleChangeData} />
    )}
  </>
  )
}
export default ProductsTable
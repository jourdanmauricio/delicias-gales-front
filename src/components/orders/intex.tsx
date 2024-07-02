import DataTable from "react-data-table-component";
const Orders = () => {
  const columns = [
    {
      name: "Fecha",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.cod,
      sortable: true,
      hide: 768,
    },
    {
      name: "metodo de pago",
      selector: (row) => row.wholesalePrice,
      sortable: true,
    },
    {
      name: "total costo",
      selector: (row) => row.retailPrice,
      sortable: true,
    },
  ];
    // return (
    //   <DataTable
    //     //dense
    //     title="Productos"
    //     actions={subHeaderComponentMemo}
    //     columns={columns}
    //     data={filteredItems}
    //     expandableRows
    //     expandableRowsComponent={ExpandedComponent}
    //     expandableRowExpanded={(row) => row === rowExpand}
    //     onRowExpandToggled={(bool, row) => expandRow(bool, row)}
    //     pagination
    //     paginationComponentOptions={paginationOptions}
    //   />
    // );
};

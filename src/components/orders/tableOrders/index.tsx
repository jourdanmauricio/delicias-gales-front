"use client";
import DataTable from "react-data-table-component";
const TableOrders = ({ dataOrders }) => {
  const columns = [
    {
      name: "Fecha",
      selector: (row) => row.date,
    },
    {
      name: "Estado",
      selector: (row) => row.status,
    },
    {
      name: "metodo de pago",
      selector: (row) => row.paymentMethod,
    },
    {
      name: "total costo",
      selector: (row) => row.total,
    },
  ];
  return (
    <DataTable
      title="historial de ordenes"
      columns={columns}
      data={dataOrders}
    />
  );
};

export default TableOrders;

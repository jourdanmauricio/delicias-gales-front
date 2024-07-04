import GetOrder from "@/utils/api/orders/getOrders";
import TableOrders from "./tableOrders";

const OrdersPage = async () => {
  const dataOrders = await GetOrder();

  return (
    <div>
      <TableOrders dataOrders={dataOrders} />
    </div>
  );
};

export default OrdersPage;

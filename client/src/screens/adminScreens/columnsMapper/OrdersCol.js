import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { dateFormatter } from "../../../utils/utils";
const detailsFormatter = (val, row) => {
  return (
    <Link to={`/order/${row.order_id}`}>
      <Button>Details</Button>
    </Link>
  );
};

const deliveredOnFormatter = (val, row) => {
  if (!val) {
    return <Button>Delivered</Button>;
  }
  return val;
};

const paidOnFormatter = (val, row) => {
  if (!val) {
    return <Button>Paid</Button>;
  }
  return val;
};

const orderItemsFormatter = (cell, row) => {
  if (row.orderItems) {
    return (
      <>
        {row.orderItems.map((orderItem, index) => {
          return <div key={index}>{orderItem.name}</div>;
        })}
        <br />
      </>
    );
  }
};

export const orderColumns = [
  {
    dataField: "order_id",
    text: "Order ID",
    sort: true,
    editable: false,
  },
  {
    dataField: "orderItems",
    text: "Order Items",
    sort: false,
    formatter: orderItemsFormatter,
    editable: false,
  },
  {
    dataField: "order_date",
    text: "Order Date",
    sort: true,
    formatter: dateFormatter,
    editable: false,
  },
  {
    dataField: "user_id",
    text: "User ID",
    hidden: true,
    sort: true,
    editable: false,
  },
  {
    dataField: "name",
    text: "User Name",
    sort: true,
    editable: false,
  },
  {
    dataField: "payment_method",
    text: "Payment Method",
    sort: true,
    editable: false,
  },
  {
    dataField: "shipping_address",
    text: "Shipping Address",
    editable: false,
  },
  {
    dataField: "items_price",
    text: "Items Cost",
    type: "number",
    editable: false,
  },
  {
    dataField: "shipping_price",
    text: "Shipping Cost",
    type: "number",
    hidden: true,
    editable: false,
  },
  {
    dataField: "total_price",
    text: "Total Cost",
    type: "number",
    hidden: true,
    editable: false,
  },
  {
    dataField: "total_price",
    text: "Details",
    type: "number",
    editable: false,
    isDummyField: true,
    formatter: detailsFormatter,
  },
  {
    dataField: "paid_on",
    text: "Paid on",
    editable: false,
    isDummyField: true,
    formatter: paidOnFormatter,
  },
  {
    dataField: "delivered_on",
    text: "Delivered on",
    editable: false,
    isDummyField: true,
    formatter: deliveredOnFormatter,
  },
];

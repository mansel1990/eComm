import { numberValidator } from "../../../utils/utils";

export const productColumns = [
  {
    dataField: "id",
    text: "Product ID",
    sort: true,
    editable: false,
  },
  {
    dataField: "name",
    text: "Product Name",
    sort: true,
  },
  {
    dataField: "one_line_desc",
    text: "One Liner",
    sort: true,
  },
  {
    dataField: "description",
    text: "Description",
    sort: true,
  },
  {
    dataField: "price",
    text: "Price",
    type: "number",
    validator: numberValidator,
    sort: true,
  },
  {
    dataField: "countInStock",
    text: "In Stock",
    type: "number",
    validator: numberValidator,
    sort: true,
  },
  {
    dataField: "state",
    text: "State",
    isDummyField: true,
    hidden: true,
  },
];

import { numberValidator } from "../../../utils/utils";

const adminFormatter = (cell, row) => {
  if (row.is_admin) {
    return <i className="fas fa-check" style={{ color: "green" }}></i>;
  }
  return <i className="fas fa-times" style={{ color: "red" }}></i>;
};

export const userColumns = [
  {
    dataField: "user_id",
    text: "User ID",
    sort: true,
    editable: false,
  },
  {
    dataField: "name",
    text: "User Name",
    sort: true,
  },
  {
    dataField: "email",
    text: "E-mail",
    sort: true,
  },
  {
    dataField: "is_admin",
    text: "Admin",
    type: "number",
    formatter: adminFormatter,
    sort: true,
  },
  {
    dataField: "phone_number",
    text: "Phone",
    type: "number",
    validator: numberValidator,
  },
];

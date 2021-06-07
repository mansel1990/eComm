import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

const columns = [
  {
    dataField: "id",
    text: "Product ID",
  },
  {
    dataField: "name",
    text: "Product Name",
  },
  {
    dataField: "price",
    text: "Product Price",
  },
];

const products = [
  {
    id: 1,
    name: "Soap",
    price: 30,
  },
  {
    id: 2,
    name: "Soap2",
    price: 40,
  },
  {
    id: 3,
    name: "Soap3",
    price: 30,
  },
];

const ProductListScreen = () => {
  return (
    <div>
      <BootstrapTable
        keyField="id"
        data={products}
        columns={columns}
        cellEdit={cellEditFactory({
          mode: "click",
          blurToSave: true,
        })}
      />
    </div>
  );
};

export default ProductListScreen;

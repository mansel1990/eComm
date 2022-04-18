import React, { useState } from "react";

import BootstrapTable from "react-bootstrap-table-next";

import cellEditFactory from "react-bootstrap-table2-editor";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import AddProductForm from "../relatedComponents/AddForm";

var productsData = [
  {
    id: 1,
    name: "Clayba",
    countInStock: 3,
    price: 200,
  },
  {
    id: 2,
    name: "Cinder",
    countInStock: 10,
    price: 250,
  },
  {
    id: 3,
    name: "Multhani",
    countInStock: 5,
    price: 200,
  },
];

const key = productsData.map((el) => el.id);

export default function EditableGrid() {
  // To delete rows you be able to select rows
  const [state, setState] = useState({
    row: null,
    state: null,
    oldValue: null,
  });

  const [products, setProducts] = useState(productsData); // products
  const [open, setOpen] = useState(false); // control for adding diaglog

  // hide checkbox for selection
  const selectRowProp = {
    mode: "checkbox",
    hideSelectColumn: true,
  };

  // validator for number fields
  const numberValidator = (newValue, row, column) => {
    if (isNaN(newValue)) {
      return {
        valid: false,
        message: "This field should be numeric",
      };
    }
    return true;
  };

  const columns = [
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
    {
      dataField: "actions",
      text: "Actions",
      editable: false,
      isDummyField: true,
      formatExtraData: state,
      formatter: (cellContent, row) => {
        if (row.state)
          return (
            <div>
              <button
                className="btn btn-secondary btn-xs"
                onClick={() => {
                  setState((prev) => {
                    row.state = null;
                    let newState = { ...prev, state: row.state, row: null };
                    return newState;
                  });
                }}
              >
                Save
              </button>
              <button
                className="btn btn-primary btn-xs"
                onClick={() => {
                  setProducts((prev) => {
                    let newVal = prev.map((el) => {
                      if (el.id === row.id) {
                        return state.oldValue;
                      }
                      return el;
                    });
                    return newVal;
                  });
                  setState((prev) => {
                    row.state = null;
                    let newState = { ...prev, state: row.state, row: null };
                    return newState;
                  });
                }}
              >
                Cancel
              </button>
            </div>
          );
        else
          return (
            <div>
              <button
                className="btn btn-danger btn-xs"
                onClick={() => handleDelete(row.id)}
              >
                <DeleteIcon />
                Delete
              </button>
            </div>
          );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  // a function to save the old value
  const handleStartEdit = (row) => {
    setState((prev) => {
      let newVal = { ...prev, oldValue: { ...row } };
      return newVal;
    });
  };

  //  delected the selected row
  const handleDelete = (rowId) => {
    setProducts(products.filter((el) => el.id !== rowId));
  };

  // add a new row
  const handleNewRow = () => {
    setOpen(true);
  };

  const handleCancelAdd = () => {
    setOpen(false);
  };

  const handleSaveAdd = (product) => {
    setProducts((prev) => {
      let newEntry = { ...product };
      let newVal = [newEntry, ...prev];
      return newVal;
    });
    setOpen(false);
  };

  return (
    <>
      <div style={{ textAlign: "left" }}>
        <Button className="btn btn-warning" onClick={handleNewRow}>
          <AddIcon fontSize="small" /> Add
        </Button>
      </div>
      <BootstrapTable
        keyField="id"
        selectRow={selectRowProp}
        data={products}
        columns={columns}
        defaultSorted={defaultSorted}
        cellEdit={cellEditFactory({
          mode: "click",
          blurToSave: true,
          onStartEdit: (row, column, rowIndex, columnIndex) => {
            console.log("start to edit!!!");
            if (row.state !== "edited") {
              console.log(row.state);
              handleStartEdit(row);
            }
          },
          beforeSaveCell: (oldValue, newValue, row, column) => {
            console.log("Before Saving Cell!!");
          },
          afterSaveCell: (oldValue, newValue, row, column) => {
            console.log("After Saving Cell!!");
            if (oldValue !== newValue) {
              row.state = "edited";
              setState({ ...state, row: row, state: row.state });
            }
          },
          nonEditableRows: () =>
            state.row ? key.filter((el) => el !== state.row.id) : [],
        })}
      />

      <AddProductForm
        open={open}
        onCancel={handleCancelAdd}
        onSave={handleSaveAdd}
      />
    </>
  );
}

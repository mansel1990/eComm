import React, { useState } from "react";

import BootstrapTable from "react-bootstrap-table-next";

import cellEditFactory from "react-bootstrap-table2-editor";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import AddProductForm from "../screens/adminScreens/AddProductForm";

const EditableGrid = (props) => {
  // To delete rows you be able to select rows
  const [state, setState] = useState({
    row: null,
    state: null,
    oldValue: null,
  });

  const {
    rows,
    columns,
    name,
    id,
    addIconVal = true,
    deleteHandler,
    updateHandler,
    addHandler,
  } = props;

  const [rowData, setRowData] = useState(rows); // rowData
  const [open, setOpen] = useState(false); // control for adding diaglog

  const key = rows.map((el) => el[`${id}`]);

  // hide checkbox for selection
  const selectRowProp = {
    mode: "checkbox",
    hideSelectColumn: true,
  };

  const actionField = {
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
                if (updateHandler) {
                  updateHandler(row);
                } else {
                  setState((prev) => {
                    row.state = null;
                    let newState = { ...prev, state: row.state, row: null };
                    return newState;
                  });
                }
              }}
            >
              Save
            </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={() => {
                setRowData((prev) => {
                  let newVal = prev.map((el) => {
                    if (el[`${id}`] === row[`${id}`]) {
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
              onClick={() => handleDelete(row[`${id}`])}
            >
              <DeleteIcon />
              Delete
            </button>
          </div>
        );
    },
  };

  const actionObj = columns.find((o) => o.dataField === "actions");
  if (!actionObj) {
    columns.push(actionField);
  } else {
    columns.splice(
      columns.findIndex((o) => o.dataField === "actions"),
      1
    );
    columns.push(actionField);
  }

  const defaultSorted = [
    {
      dataField: id,
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
    if (deleteHandler) {
      deleteHandler(rowId);
    } else {
      setRowData(rowData.filter((el) => el[`${id}`] !== rowId));
    }
  };

  // add a new row
  const handleNewRow = () => {
    setOpen(true);
  };

  const handleCancelAdd = () => {
    setOpen(false);
  };

  const handleSaveAdd = (row) => {
    if (addHandler) {
      addHandler(row);
    } else {
      setRowData((prev) => {
        let newEntry = { ...row };
        let newVal = [newEntry, ...prev];
        return newVal;
      });
    }
    setOpen(false);
  };

  return (
    <>
      {addIconVal ? (
        <div style={{ textAlign: "left" }}>
          <Button className="btn btn-warning" onClick={handleNewRow}>
            <AddIcon fontSize="small" /> Add
          </Button>
        </div>
      ) : null}
      <BootstrapTable
        keyField={id}
        selectRow={selectRowProp}
        data={rowData}
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

      {name === "ProductsGrid" ? (
        <AddProductForm
          open={open}
          onCancel={handleCancelAdd}
          onSave={handleSaveAdd}
        />
      ) : (
        <AddProductForm
          open={open}
          onCancel={handleCancelAdd}
          onSave={handleSaveAdd}
        />
      )}
    </>
  );
};

export default EditableGrid;

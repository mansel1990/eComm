import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddForm(props) {
  const [product, setProduct] = useState({
    name: "",
    price: 200,
    countInStock: 0,
  });

  const handleClose = () => {
    props.onCancel();
  };

  const handleSave = () => {
    props.onSave(product);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Product</DialogTitle>
        <DialogContent>
          <DialogContentText>Adding</DialogContentText>

          <FormControl className="py-3" style={{ width: 280 }}>
            <TextField
              autoFocus
              id="product-name-input"
              className="py-3 my-2"
              label="Product Name"
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <TextField
              className="py-3 my-2"
              id="product-price-input"
              label="Price"
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
            <TextField
              className="py-3 my-2"
              id="product-count-input"
              label="In Stock"
              type="number"
              value={product.countInStock}
              onChange={(e) =>
                setProduct({ ...product, countInStock: e.target.value })
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

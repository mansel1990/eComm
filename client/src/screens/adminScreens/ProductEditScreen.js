import React from "react";
import { Link } from "react-router-dom";

const ProductEditScreen = () => {
  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <h2>Edit Product</h2>
    </>
  );
};

export default ProductEditScreen;

import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  addProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from "../../actions/productActions";
import EditableGrid from "../../components/EditableGrid";
import { productColumns } from "./columnsMapper/ProductsCol";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productAdd = useSelector((state) => state.productAdd);
  const {
    loading: loadingAdd,
    error: errorAdd,
    success: successAdd,
  } = productAdd;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete, successAdd, successUpdate]);

  const addProductHandler = (product) => {
    dispatch(addProduct(product));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const updateHandler = (product) => {
    dispatch(
      updateProduct({
        id: product.id,
        name: product.name,
        oneLiner: product.one_line_desc,
        description: product.description,
        price: product.price,
        countInStock: product.countInStock,
      })
    );
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loadingAdd && <Loader />}
      {errorAdd && <Message variant="danger">{errorAdd}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <EditableGrid
          name="ProductsGrid"
          rows={products}
          columns={productColumns}
          id="id"
          addHandler={addProductHandler}
          deleteHandler={deleteHandler}
          updateHandler={updateHandler}
        />
      )}
    </>
  );
};

export default ProductListScreen;

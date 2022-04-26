import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../actions/orderActions";
import EditableGrid from "../../components/EditableGrid";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { orderColumns } from "./columnsMapper/OrdersCol";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const allOrdersList = useSelector((state) => state.allOrdersList);
  const { loading, error, allOrders } = allOrdersList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <EditableGrid
          name="OrdersGrid"
          rows={allOrders}
          columns={orderColumns}
          id="order_id"
          addIconVal={false}
          actionsRequired={false}
        />
      )}
    </>
  );
};

export default OrderListScreen;

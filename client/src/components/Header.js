import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userLoginActions";
import { isEmpty } from "lodash";

import Badge from "@mui/material/Badge";
import Notifications from "@mui/icons-material/Notifications";

import Pusher from "pusher-js/with-encryption";
import { getNotAcceptedOrderCount } from "../actions/orderActions";
import {
  PUSHER_APP_CLUSTER,
  PUSHER_APP_KEY,
} from "../constants/commonConstants";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { notAcceptedOrderCount } = useSelector(
    (state) => state.notAcceptedOrderCount
  );

  const logoutHandler = () => {
    dispatch(logout());
  };

  const [newOrderCount, setNewOrderCount] = useState(0);

  if (userInfo && userInfo.isAdmin === 1) {
    const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe("order-channel");
    channel.bind("place-order-event", function (data) {
      if (
        newOrderCount &&
        newOrderCount > 0 &&
        data.unattendedOrders !== newOrderCount
      ) {
        setNewOrderCount(data.unattendedOrders);
      }
    });
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getNotAcceptedOrderCount());
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    setNewOrderCount(notAcceptedOrderCount);
  }, [notAcceptedOrderCount]);

  return (
    <header>
      <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>EComm</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart" />
                  Cart
                </Nav.Link>
              </LinkContainer>
              {!isEmpty(userInfo) ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user" />
                    Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin === 1 && (
                <>
                  <NavDropdown title="Admin" id="adminmenu">
                    <LinkContainer to="/admin/userList">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <div style={{ padding: "2% 0 0 0" }}>
                    <Badge badgeContent={newOrderCount} color="primary">
                      <Notifications color="action" />
                    </Badge>
                  </div>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

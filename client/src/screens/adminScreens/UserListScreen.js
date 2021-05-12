import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getAllUsers } from "../../actions/userLoginActions";

const UserListScreen = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message cvariant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm"></Table>
      )}
    </>
  );
};

export default UserListScreen;

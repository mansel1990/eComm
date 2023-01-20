import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  getAllUsers,
  deleteUser,
  updateUser,
} from "../../actions/userLoginActions";
import EditableGrid from "../../components/EditableGrid";
import { userColumns } from "./columnsMapper/UsersCol";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate } = userUpdate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete, successUpdate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  const updateHandler = (user) => {
    dispatch(
      updateUser({
        id: user.user_id,
        name: user.name,
        email: user.email,
        phone: user.phone_number,
        isAdmin: user.is_admin > 0 ? true : false,
      })
    );
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message cvariant="danger">{error}</Message>
      ) : (
        <EditableGrid
          name="UsersGrid"
          rows={users}
          columns={userColumns}
          id="user_id"
          addIconVal={false}
          deleteHandler={deleteHandler}
          updateHandler={updateHandler}
        />
      )}
    </>
  );
};

export default UserListScreen;

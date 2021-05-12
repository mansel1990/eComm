import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducers,
  productListReducers,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userDetailsReducers,
  userListReducers,
  userLoginReducers,
  userRegisterReducers,
  userUpdateProfileReducers,
} from "./reducers/userReducers";
import {
  myOrderListReducers,
  orderCreateReducers,
  orderDetailsReducers,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducers,
  orderCreate: orderCreateReducers,
  orderDetails: orderDetailsReducers,
  myOrderList: myOrderListReducers,
  cart: cartReducer,
  userList: userListReducers,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [ReduxThunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

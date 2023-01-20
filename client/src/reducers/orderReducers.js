import {
  ALL_ORDER_LIST_FAIL,
  ALL_ORDER_LIST_REQUEST,
  ALL_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  NOT_ACCEPTED_ORDER_COUNT_FAIL,
  NOT_ACCEPTED_ORDER_COUNT_REQ,
  NOT_ACCEPTED_ORDER_COUNT_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_RESET,
} from "../constants/orderConstants";

export const orderCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        success: true,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducers = (
  state = { loading: true, order: {}, orderItems: [] },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload.order,
        orderItems: action.payload.orderItems,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const myOrderListReducers = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case MY_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const allOrdersReducers = (state = { allOrders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        allOrders: action.payload,
      };
    case ALL_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const notAcceptedOrderCountReducers = (
  state = { notAcceptedOrderCount: 0 },
  action
) => {
  switch (action.type) {
    case NOT_ACCEPTED_ORDER_COUNT_REQ:
      return {
        loading: true,
      };
    case NOT_ACCEPTED_ORDER_COUNT_SUCCESS:
      return {
        loading: false,
        notAcceptedOrderCount: action.payload,
      };
    case NOT_ACCEPTED_ORDER_COUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

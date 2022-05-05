import dbConn from "../config/db.js";
import util from "util";
import asyncHandler from "express-async-handler";
import Pusher from "pusher";
import dontenv from "dotenv";

dontenv.config();

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const query = util.promisify(dbConn.query).bind(dbConn);
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }
  try {
    const productsString = JSON.stringify(orderItems);
    const insertOrder = `INSERT INTO orders
        (user_id, order_items, shipping_address, payment_method, items_price, shipping_price, total_price)
        VALUES(${req.user.user_id}, '${productsString}', '${shippingAddress}', '${paymentMethod}', ${itemsPrice}, ${shippingPrice}, ${totalPrice});`;

    const insResult = await query(insertOrder);

    const orderCount = await query(
      `select count(o.order_id) as count from orders o where o.order_accepted is null;`
    );

    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: process.env.PUSHER_APP_CLUSTER,
      useTLS: true,
    });
    pusher.trigger("order-channel", "place-order-event", {
      unattendedOrders: orderCount[0].count,
    });

    res.status(201).json({
      orderId: insResult.insertId,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    let order = await query(
      `select 
        u.name, u.email, o.* 
      from 
        orders o, users u 
      where 
        o.user_id = ${req.user.user_id} 
        and order_id = ${req.params.id} 
        and o.user_id = u.user_id`
    );
    if (req.user.is_admin) {
      order = await query(
        `select u.name, u.email, o.* 
          from orders o, users u 
          where o.user_id = u.user_id and order_id = ${req.params.id}`
      );
    }

    if (order && order.length > 0) {
      const orderItems = JSON.parse(order[0].order_items);
      res.json({ order, orderItems });
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const orders = await query(
      `select
        u.name,
        u.email,
        o.*
      from
        users u,
        orders o
      where
        o.user_id = u.user_id
        and o.user_id = ${req.user.user_id}`
    );
    if (orders && orders.length > 0) {
      orders.map((order) => (order.orderItems = JSON.parse(order.order_items)));
      res.json(orders);
    } else {
      throw new Error("No Orders");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const orders = await query(
      `select
      u.user_id,
      u.name,
      u.email,
      o.*
    from
      users u,
      orders o
    where
      o.user_id = u.user_id
    order by
      o.order_id desc`
    );
    if (orders && orders.length > 0) {
      orders.map((order) => (order.orderItems = JSON.parse(order.order_items)));
      res.json(orders);
    } else {
      res.status(404);
      throw new Error("No Orders");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const getNotAcceptedOrderCount = asyncHandler(async (req, res) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const orderCount = await query(
      `select count(o.order_id) as count from orders o where o.order_accepted is null;`
    );
    res.json(orderCount[0].count);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

export {
  addOrderItems,
  getOrderById,
  getMyOrders,
  getAllOrders,
  getNotAcceptedOrderCount,
};

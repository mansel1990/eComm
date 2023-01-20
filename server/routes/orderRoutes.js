import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getAllOrders,
  getNotAcceptedOrderCount,
} from "../controllers/orderController.js";

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);
router
  .route("/getNotAcceptedOrderCount")
  .get(protect, admin, getNotAcceptedOrderCount);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);

export default router;

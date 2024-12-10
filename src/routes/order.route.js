import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrders,
  updateProgress,
  updatePayment,
  updateDeliveryStatus,
  cancelOrder,
  abandonOrder,
  completeOrder,
  fulfillOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

const router = Router();

router.route("/create").post(createOrder);
router.route("/get-all/:id").get(getAllOrders);
router.route("/get/:id").get(getOrders);
router.route("/update-progress/:id").post(updateProgress);
router.route("/update-payment/:id").post(updatePayment);
router.route("/update-delivery-status/:id").post(updateDeliveryStatus);
router.route("/cancel-order/:id").post(cancelOrder);
router.route("/abandon-order/:id").post(abandonOrder);
router.route("/complete-order/:id").post(completeOrder);
router.route("/fullfill-order/:id").post(fulfillOrder);
router.route("/delete/:id").get(abandonOrder);

export default router;

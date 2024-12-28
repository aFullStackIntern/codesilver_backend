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
  addDiscount,
  removeDiscount,
  addBuyXGetY,
} from "../controllers/order.controller.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";
import { verifyCustomer } from "../middlewares/customerAuth.middleware.js";

const router = Router();

router.route("/create").post(verifyCustomer, createOrder);
router.route("/get-all").get(verifyAdmin, getAllOrders);
router.route("/get").get(verifyCustomer, getOrders);
router.route("/update-progress").post(verifyCustomer, updateProgress);
router.route("/update-payment/:id").post(updatePayment);
router.route("/update-delivery-status/:id").post(updateDeliveryStatus);
router.route("/cancel-order/:id").post(cancelOrder);
router.route("/abandon-order/:id").post(abandonOrder);
router.route("/complete-order/:id").post(completeOrder);
router.route("/fullfill-order/:id").post(fulfillOrder);
router.route("/delete/:id").get(deleteOrder);
router.route("/add-discount").post(addDiscount);
router.route("/remove-discount/:id").get(removeDiscount);
router.route("/add-buyget").post(addBuyXGetY);

export default router;

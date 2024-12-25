import { Router } from "express";
import {
  createCart,
  getCart,
  addProducts,
  deleteCart,
  removeProduct,
  updateGift,
} from "../controllers/cart.controller.js";
import { verifyCustomer } from "../middlewares/customerAuth.middleware.js";

const router = Router();

router.route("/create").post(verifyCustomer, createCart);
router.route("/get-cart").get(verifyCustomer, getCart);
router.route("/delete").get(verifyCustomer, deleteCart);
router.route("/add-products").post(verifyCustomer, addProducts);
router.route("/remove-products").post(verifyCustomer, removeProduct);
router.route("/update-gift").post(verifyCustomer, updateGift);

export default router;

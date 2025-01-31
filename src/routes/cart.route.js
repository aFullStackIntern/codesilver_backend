import { Router } from "express";
import {
  createCart,
  getCart,
  addProducts,
  deleteCart,
  removeProduct,
  updateGift,
  addHamper,
  removeHamper,
  changeHamper,
  getAllCarts,
} from "../controllers/cart.controller.js";
import { verifyCustomer } from "../middlewares/customerAuth.middleware.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.route("/create").post(verifyCustomer, createCart);
router.route("/get-cart").get(verifyCustomer, getCart);
router.route("/get-all").get(verifyAdmin, getAllCarts);
router.route("/delete").get(verifyCustomer, deleteCart);
router.route("/add-products").post(verifyCustomer, addProducts);
router.route("/remove-products").post(verifyCustomer, removeProduct);
router.route("/update-gift").post(verifyCustomer, updateGift);
router.route("/add-hamper").get(verifyCustomer, addHamper);
router.route("/remove-hamper").get(verifyCustomer, removeHamper);
router.route("/change-hamper").get(verifyCustomer, changeHamper);

export default router;

import {
  addProduct,
  removeProduct,
  createRecentlyViewed,
  getAllRecentlyViewed,
  viewViewed,
} from "../controllers/recentlyViewed.controller.js";
import { Router } from "express";
import { verifyCustomer } from "../middlewares/customerAuth.middleware.js";

const router = Router();

router.route("/create").post(createRecentlyViewed);
router.route("/get-all").get(verifyCustomer, getAllRecentlyViewed);
router.route("/add-product").get(verifyCustomer, addProduct);
router.route("/remove-product").get(verifyCustomer, removeProduct);
router.route("/view-recent").get(verifyCustomer, viewViewed);

export default router;

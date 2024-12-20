import { Router } from "express";
import {
  addProduct,
  createWishlist,
  getAllWishlists,
  removeProduct,
  viewWishlist,
} from "../controllers/wishlist.controller.js";
import { verifyCustomer } from "../middlewares/customerAuth.middleware.js";

const router = Router();

router.route("/create").post(createWishlist);
router.route("/get-all").get(getAllWishlists);
router.route("/add-product").post(verifyCustomer, addProduct);
router.route("/remove-product").get(verifyCustomer, removeProduct);
router.route("/view-wishlist").get(verifyCustomer, viewWishlist);

export default router;

import { Router } from "express";
import {
  createCart,
  getCart,
  addProducts,
} from "../controllers/cart.controller.js";

const router = Router();

router.route("/create").post(createCart);
router.route("/get-cart/:id").get(getCart);
router.route("/add-products/:id").post(addProducts);

export default router;

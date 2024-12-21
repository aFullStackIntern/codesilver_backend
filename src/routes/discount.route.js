import { Router } from "express";
import {
  createDiscount,
  getAllDiscounts,
  updateDiscounts,
  deleteDiscount,
  getDiscountById,
} from "../controllers/discount.controller.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";
import { verifyCustomer } from "../middlewares/customerAuth.middleware.js";

const router = Router();

router.route("/create").post(verifyAdmin, createDiscount);
router.route("/get-all").get(getAllDiscounts);
router.route("/update/:id").post(verifyAdmin, updateDiscounts);
router.route("/get-by-id/:id").get(getDiscountById);
router.route("/delete/:id").get(verifyAdmin, deleteDiscount);

export default router;

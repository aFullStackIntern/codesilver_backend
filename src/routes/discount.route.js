import { Router } from "express";
import {
  createDiscount,
  getAllDiscounts,
  updateDiscounts,
  deleteDiscount,
  getDiscountById,
} from "../controllers/discount.controller.js";

const router = Router();

router.route("/create").post(createDiscount);
router.route("/get-all").get(getAllDiscounts);
router.route("/update/:id").post(updateDiscounts);
router.route("/get-by-id/:id").get(getDiscountById);
router.route("/delete/:id").get(deleteDiscount);

export default router;

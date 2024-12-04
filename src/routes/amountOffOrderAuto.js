import { Router } from "express";
import {
  getDiscountById,
  createDiscount,
  updateDiscount,
  getAllDiscounts,
  deleteDiscount,
} from "../controllers/amountOffOrderAuto.js";

const router = Router();
router.route("/create").post(createDiscount);
router.route("/get-all/:id").post(getAllDiscounts);
router.route("/update").post(updateDiscount);
router.route("/get-by-id/:id").post(getDiscountById);
router.route("/delete/:id").post(deleteDiscount);

export default router;

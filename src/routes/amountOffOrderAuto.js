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
router.route("/get-all").get(getAllDiscounts);
router.route("/update/:id").post(updateDiscount);
router.route("/get-by-id/:id").get(getDiscountById);
router.route("/delete/:id").get(deleteDiscount);

export default router;

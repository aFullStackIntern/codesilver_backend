import { Router } from "express";
import {
  getDiscountById,
  createDiscount,
  updateDiscount,
  getAllDiscounts,
  deleteDiscount,
} from "../controllers/buyXGetYAuto.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();
router.route("/create").post(verifyAdmin, createDiscount);
router.route("/get-all").get(getAllDiscounts);
router.route("/update/:id").post(verifyAdmin, updateDiscount);
router.route("/get-by-id/:id").get(getDiscountById);
router.route("/delete/:id").get(verifyAdmin, deleteDiscount);

export default router;

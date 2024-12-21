import { Router } from "express";
import {
  createShipping,
  getAllShipping,
  updateShipping,
  getShippingById,
  deleteShipping,
} from "../controllers/shipping.controller.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.route("/create").post(verifyAdmin, createShipping);
router.route("/get-all").get(getAllShipping);
router.route("/update/:id").post(verifyAdmin, updateShipping);
router.route("/delete/:id").get(verifyAdmin, deleteShipping);
router.route("/get-by-id/:id").get(getShippingById);

export default router;

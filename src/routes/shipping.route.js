import { Router } from "express";
import {
  createShipping,
  getAllShipping,
  updateShipping,
  getShippingById,
  deleteShipping,
} from "../controllers/shipping.controller.js";

const router = Router();

router.route("/create").post(createShipping);
router.route("/get-all").get(getAllShipping);
router.route("/update/:id").post(updateShipping);
router.route("/delete/:id").get(deleteShipping);
router.route("/get-by-id/:id").get(getShippingById);

export default router;

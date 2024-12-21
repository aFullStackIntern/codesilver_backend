import { Router } from "express";
import {
  createRate,
  updateRates,
  getAllRates,
  getRateById,
  deleteRate,
} from "../controllers/rate.controller.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.route("/create").post(verifyAdmin, createRate);
router.route("/get-all").get(getAllRates);
router.route("/update/:id").post(verifyAdmin, updateRates);
router.route("/get-by-id/:id").get(getRateById);
router.route("/delete/:id").get(verifyAdmin, deleteRate);

export default router;

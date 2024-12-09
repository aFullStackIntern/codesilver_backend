import { Router } from "express";
import {
  createRate,
  updateRates,
  getAllRates,
  getRateById,
  deleteRate,
} from "../controllers/rate.controller.js";

const router = Router();

router.route("/create").post(createRate);
router.route("/get-all").get(getAllRates);
router.route("/update/:id").post(updateRates);
router.route("/get-by-id/:id").post(getRateById);
router.route("/delete/:id").post(deleteRate);

export default router;

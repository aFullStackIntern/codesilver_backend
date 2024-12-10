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
router.route("/get-by-id/:id").get(getRateById);
router.route("/delete/:id").get(deleteRate);

export default router;

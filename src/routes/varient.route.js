import { Router } from "express";
import {
  createVarient,
  deleteVarient,
  getAllVarients,
  getById,
  updateVarient,
} from "../controllers/varient.controller.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.route("/create").post(verifyAdmin, createVarient);
router.route("/get-all").get(getAllVarients);
router.route("/update/:id").post(verifyAdmin, updateVarient);
router.route("/delete/:id").get(verifyAdmin, deleteVarient);
router.route("/get-by-id/:id").get(getById);

export default router;

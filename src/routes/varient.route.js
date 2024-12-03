import { Router } from "express";
import {
  createVarient,
  deleteVarient,
  getAllVarients,
  getById,
  updateVarient,
} from "../controllers/varient.controller.js";

const router = Router();

router.route("/create").post(createVarient);
router.route("/get-all").get(getAllVarients);
router.route("/update/:id").post(updateVarient);
router.route("/delete/:id").get(deleteVarient);
router.route("/get-by-id/:id").get(getById);

export default router;

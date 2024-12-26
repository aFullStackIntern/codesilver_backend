import { Router } from "express";
import {
  createHamper,
  deleteHamper,
  getAllHampers,
  getHamperById,
  getHamperByName,
  updateHamper,
} from "../controllers/hamper.controller.js";

const router = Router();

router.route("/create").post(createHamper);
router.route("/update").post(updateHamper);
router.route("/delete").get(deleteHamper);
router.route("/get-all").get(getAllHampers);
router.route("/get-by-id").get(getHamperById);
router.route("/get-by-name").get(getHamperByName);

export default router;

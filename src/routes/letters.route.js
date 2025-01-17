import { Router } from "express";
import {
  createLetter,
  deleteLetter,
  getAllLetters,
  getLetterById,
  updateLetter,
} from "../controllers/letters.controller.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();
router.route("/create").post(verifyAdmin, createLetter);
router.route("/get-all").get(verifyAdmin, getAllLetters);
router.route("/get-by-id").get(getLetterById);
router.route("/delete").get(verifyAdmin, deleteLetter);
router.route("/update").post(verifyAdmin, updateLetter);

export default router;

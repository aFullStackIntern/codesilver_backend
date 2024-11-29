import { Router } from "express";
import {
  changePassword,
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  login,
  updateAdmin,
  logoutAdmin,
} from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.route("/create").post(verifyAdmin, createAdmin);
router.route("/get-all").get(verifyAdmin, getAllAdmins);
router.route("/delete/:id").get(verifyAdmin, deleteAdmin);
router.route("/login").post(login);
router.route("/update/:id").post(verifyAdmin, updateAdmin);
router.route("/update-password/:id").post(verifyAdmin, changePassword);
router.route("/logout").get(verifyAdmin, logoutAdmin);

export default router;

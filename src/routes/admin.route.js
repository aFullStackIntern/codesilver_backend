import { Router } from "express";
import {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  login,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/create").post(createAdmin);
router.route("/get-all").get(getAllAdmins);
router.route("/delete/:id").get(deleteAdmin);
router.route("/login").post(login);

export default router;

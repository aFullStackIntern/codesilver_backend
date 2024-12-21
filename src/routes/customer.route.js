import {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  login,
  logoutCustomer,
  changePassword,
  exportCustomers,
  importCustomers,
} from "../controllers/customer.controller.js";
import { Router } from "express";
import { verifyCustomer } from "../middlewares/customerAuth.middleware.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";
import { uploadCsv } from "../middlewares/multerCsv.middleware.js";

const router = Router();

router.route("/create").post(createCustomer);
router.route("/logout").get(verifyCustomer, logoutCustomer);
router.route("/login").post(login);
router.route("/update/:id").post(verifyCustomer, updateCustomer);
router.route("/get-all").get(verifyAdmin, getAllCustomers);
router.route("/delete/:id").get(deleteCustomer);
router.route("/change-password/:id").post(verifyCustomer, changePassword);
router.route("/export-customers").get(verifyAdmin, exportCustomers);
router
  .route("/import-customers")
  .post(
    verifyAdmin,
    uploadCsv.fields([{ name: "csv", maxCount: 1 }]),
    importCustomers
  );

export default router;

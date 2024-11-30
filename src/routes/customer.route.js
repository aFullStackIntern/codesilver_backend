import {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  login,
  logoutCustomer,
} from "../controllers/customer.controller.js";
import { Router } from "express";
import { verifyCustomer } from "../middlewares/customerAuth.middleware.js";

const router = Router();

router.route("/create").post(createCustomer);
router.route("/logout").get(verifyCustomer, logoutCustomer);
router.route("/login").post(login);
router.route("/update/:id").post(updateCustomer);
router.route("/get-all").get(getAllCustomers);
router.route("/delete/:id").get(deleteCustomer);

export default router;

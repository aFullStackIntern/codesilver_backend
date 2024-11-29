import { createCustomer } from "../controllers/customer.controller.js";
import { Router } from "express";

const router = Router();

router.route("/create").post(createCustomer);

export default router;

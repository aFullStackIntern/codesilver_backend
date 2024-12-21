import {
  createReview,
  deleteReview,
  getAllReviews,
  getCustomerReviews,
  getProductReviews,
  updateReviewStatus,
} from "../controllers/review.controller.js";
import { Router } from "express";
import { verifyCustomer } from "../middlewares/customerAuth.middleware.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.route("/create").post(verifyCustomer, createReview);
router.route("/delete/:id").get(verifyAdmin, deleteReview);
router.route("/get-product-reviews/:productId").get(getProductReviews);
router.route("/get-customer-reviews/:customerId").get(getCustomerReviews);
router.route("/change-status/:id").get(updateReviewStatus);
router.route("/get-all").get(verifyAdmin, getAllReviews);

export default router;

import {
  createReview,
  deleteReview,
  getAllReviews,
  getCustomerReviews,
  getProductReviews,
  updateReviewStatus,
} from "../controllers/review.controller.js";
import { Router } from "express";

const router = Router();

router.route("/create").post(createReview);
router.route("/delete/:id").get(deleteReview);
router.route("/get-product-reviews/:productId").get(getProductReviews);
router.route("/get-customer-reviews/:customerId").get(getCustomerReviews);
router.route("/change-status/:id").get(updateReviewStatus);
router.route("/get-all").get(getAllReviews);

export default router;

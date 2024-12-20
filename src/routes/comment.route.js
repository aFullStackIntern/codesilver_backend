import {
  createComment,
  deleteComment,
  getAllComments,
  getAllCommentsByBlog,
  getAllCommentsByCustomer,
  getAllCommentsByReview,
} from "../controllers/comment.controller.js";
import { Router } from "express";

const router = Router();

router.route("/create").post(createComment);
router.route("/get-all").get(getAllComments);
router.route("/get-by-customer").get(getAllCommentsByCustomer);
router.route("/get-by-review").get(getAllCommentsByReview);
router.route("/get-by-blog").get(getAllCommentsByBlog);
router.route("/delete/:id").get(deleteComment);

export default router;

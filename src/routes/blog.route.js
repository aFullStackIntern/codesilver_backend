import {
  createBlog,
  getAllBlogs,
  updateBlog,
  getBlogById,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { Router } from "express";
import { uploadImage } from "../middlewares/multerImage.middleware.js";

const router = Router();

router
  .route("/create")
  .post(uploadImage.fields([{ name: "image", maxCount: 1 }]), createBlog);
router.route("/get-all").get(getAllBlogs);
router.route("/update/:id").post(updateBlog);
router.route("/get-by-id/:id").get(getBlogById);
router.route("/delete/:id").get(deleteBlog);

export default router;

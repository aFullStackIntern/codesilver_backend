import {
  createBlog,
  getAllBlogs,
  updateBlog,
  getBlogById,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { Router } from "express";
import { uploadImage } from "../middlewares/multerImage.middleware.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();

router
  .route("/create")
  .post(
    verifyAdmin,
    uploadImage.fields([{ name: "image", maxCount: 1 }]),
    createBlog
  );
router.route("/get-all").get(getAllBlogs);
router.route("/update/:id").post(verifyAdmin, updateBlog);
router.route("/get-by-id/:id").get(getBlogById);
router.route("/delete/:id").get(verifyAdmin, deleteBlog);

export default router;

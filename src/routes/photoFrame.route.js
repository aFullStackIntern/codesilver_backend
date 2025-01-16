import { Router } from "express";
import {
  createPhotoFrame,
  getPhotoFrame,
} from "../controllers/photoFrame.controller.js";
import { uploadImage } from "../middlewares/multerImage.middleware.js";

const router = Router();

router
  .route("/create")
  .post(uploadImage.fields([{ name: "image", maxCount: 1 }]), createPhotoFrame);
router.route("/get-one").get(getPhotoFrame);

export default router;

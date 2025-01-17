import { Router } from "express";
import {
  createPhotoFrame,
  deletePhotoFrame,
  getPhotoFrame,
  updateImage,
} from "../controllers/photoFrame.controller.js";
import { uploadImage } from "../middlewares/multerImage.middleware.js";

const router = Router();

router
  .route("/create")
  .post(uploadImage.fields([{ name: "image", maxCount: 1 }]), createPhotoFrame);
router.route("/get-one").get(getPhotoFrame);
router.route("/delete").get(deletePhotoFrame);
router
  .route("/update-image")
  .get(uploadImage.fields([{ name: "image", maxCount: 1 }]), updateImage);

export default router;

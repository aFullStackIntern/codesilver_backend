import { Router } from "express";
import {
  createProduct,
  updateImage,
  updateMedium,
  updateProduct,
} from "../controllers/product.controller.js";
import { uploadImage } from "../middlewares/multerImage.middleware.js";

const router = Router();

router.route("/create").post(
  uploadImage.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "medias",
      maxCount: 2,
    },
  ]),
  createProduct
);

router.route("/update-image/:id").post(
  uploadImage.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  updateImage
);

router.route("/update-medium/:id").post(
  uploadImage.fields([
    {
      name: "medium",
      maxCount: 1,
    },
  ]),
  updateMedium
);

router.route("/update/:id").post(updateProduct);

export default router;

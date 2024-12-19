import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductsByCollectionId,
  getProductsByCollectionName,
  saveDraft,
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
router.route("/get-all").get(getAllProducts);
router.route("/get-by-collection-name").get(getProductsByCollectionName);
router.route("/get-by-collection-id").get(getProductsByCollectionId);
router.route("/delete/:id").get(deleteProduct);
router.route("/save-draft/:id").get(saveDraft);

export default router;

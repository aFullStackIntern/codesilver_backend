import { uploadImage } from "../middlewares/multerImage.middleware.js";
import { Router } from "express";
import {
  createCollection,
  deleteCollection,
  getAllCollections,
  getByTitle,
  updateCollection,
  updateImage,
} from "../controllers/collection.controller.js";

const router = Router();

router.route("/create").post(
  uploadImage.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  createCollection
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
router.route("/get-all").get(getAllCollections);
router.route("/get-by-title").get(getByTitle);
router.route("/delete/:id").get(deleteCollection);
router.route("/update/:id").post(updateCollection);

export default router;

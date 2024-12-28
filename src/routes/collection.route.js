import { uploadImage } from "../middlewares/multerImage.middleware.js";
import { Router } from "express";
import {
  createCollection,
  deleteCollection,
  getAllCollections,
  getById,
  getByTitle,
  updateCollection,
  updateImage,
} from "../controllers/collection.controller.js";
import { verifyAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.route("/create").post(
  verifyAdmin,
  uploadImage.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  createCollection
);
router.route("/update-image/:id").post(
  verifyAdmin,
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
router.route("/delete/:id").get(verifyAdmin, deleteCollection);
router.route("/update/:id").post(verifyAdmin, updateCollection);
router.route("/get-by-id/:id").get(getById);

export default router;

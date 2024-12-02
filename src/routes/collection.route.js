import { uploadImage } from "../middlewares/multerImage.middleware.js";
import { Router } from "express";
import { createCollection } from "../controllers/collection.controller.js";

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

export default router;

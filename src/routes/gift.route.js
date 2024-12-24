import { Router } from "express";
import {
  createGift,
  getAllGifts,
  getById,
  updateGifts,
} from "../controllers/gift.controller.js";
import { uploadImage } from "../middlewares/multerImage.middleware.js";

const router = Router();

router.route("/create").post(
  uploadImage.fields([
    {
      name: "images",
      maxCount: 2,
    },
  ]),
  createGift
);

router.route("/get-all").get(getAllGifts);
router.route("/get-by-id").get(getById);
router.route("/update").post(updateGifts);

export default router;

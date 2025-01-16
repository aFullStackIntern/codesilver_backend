import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { PhotoFrames } from "../models/photoFrames.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createPhotoFrame = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    throw new ApiError(400, "Product id is required!!!");
  }

  const localFilePath = req.files?.image[0]?.path;
  if (!localFilePath) {
    throw new ApiError(400, "Image is required!!!");
  }

  const image = await uploadOnCloudinary(localFilePath);
  if (!image) {
    throw new ApiError(500, "Something went wrong while updating the image!!!");
  }

  const photoFrame = await PhotoFrames.create({ productId, image: image.url });
  if (!photoFrame) {
    throw new ApiError(
      500,
      "Something went wrong while creating the photoframe!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Photo frame created!!!", photoFrame));
});

const getPhotoFrame = asyncHandler(async (req, res) => {
  const { productId } = req.query.id;
  if (!productId) {
    throw new ApiError(400, "Product id is required!!!");
  }

  const photoFrame = await PhotoFrames.findOne({ productId });
  if (!photoFrame) {
    throw new ApiError(400, "No photo frame found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Photo frame fetched!!!", photoFrame));
});

export { createPhotoFrame, getPhotoFrame };

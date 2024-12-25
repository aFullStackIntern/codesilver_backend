import { Gifts } from "../models/gift.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createGift = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    throw new ApiError(400, "Some fields are missing!!!");
  }

  const images = [];
  for (let i = 0; i < req.files.images.length; i++) {
    const image = await uploadOnCloudinary(req.files.images[i].path);
    if (!image) {
      throw new ApiError(
        500,
        `Something went wrong while uploadin the image: ${i}`
      );
    }
    images.push(image.url);
  }

  const gift = await Gifts.create({
    name,
    price,
    images,
  });

  if (!gift) {
    throw new ApiError(500, "Something went wrong while creating the gifts!!!");
  }

  res.status(200).json(new ApiResponse(200, "Gift created!!!", gift));
});

const getAllGifts = asyncHandler(async (req, res) => {
  const gifts = await Gifts.find();
  if (!gifts) {
    throw new ApiError(500, "Something went wrong while fetchng the gifts!!!");
  }

  res.status(200).json(new ApiResponse(200, "Gifts sent!!!", gifts));
});

const getById = asyncHandler(async (req, res) => {
  const id = req.query.id;
  if (!id) {
    throw new ApiError(400, "Gift id is required!!!");
  }
  const gift = await Gifts.findOne({ _id: id });
  if (!gift) {
    throw new ApiError(500, "Something went wrong while fetching the gift!!!");
  }

  res.status(200).json(new ApiResponse(200, "Gift fetched!!!", gift));
});

const updateGifts = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  if (!name && !price) {
    throw new ApiError(400, "All fields are empty!!!");
  }

  const id = req.query.id;
  if (!id) {
    throw new ApiError(400, "Gift id is required!!!");
  }

  const updatedGifts = await Gifts.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedGifts) {
    throw new ApiError(500, "Something went wrong while updating the gift!!!");
  }

  res.status(200).json(new ApiResponse(200, "Gift updated!!!", updatedGifts));
});

const deleteGift = asyncHandler(async (req, res) => {
  const id = req.query.id;
  if (!id) {
    throw new ApiError(400, "Gift id is required!!!");
  }

  const deletedGift = await Gifts.findByIdAndDelete(id);
  if (!deletedGift) {
    throw new ApiError(500, "Something went wrong while deleting the gift!!!");
  }

  res.status(200).json(new ApiResponse(200, "Gift deleted!!!"));
});

const updateImage = asyncHandler(async (req, res) => {
  const id = req.query.id;
  if (!id) {
    throw new ApiError(400, "Id is required!!!");
  }

  const images = [];
  for (let i = 0; i < req.files.images.length; i++) {
    const image = await uploadOnCloudinary(req.files.images[i].path);
    if (!image) {
      throw new ApiError(
        500,
        `Something went wrong while uploadin the image: ${i}`
      );
    }
    images.push(image.url);
  }

  const updatedGift = await Gifts.findByIdAndUpdate(
    id,
    { $set: { images } },
    { new: true }
  );
  if (!updatedGift) {
    throw new ApiError(500, "Something went wrong while updating the gift");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Images changed successfully!!!", updatedGift));
});

export {
  createGift,
  getAllGifts,
  getById,
  updateGifts,
  deleteGift,
  updateImage,
};

import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Viewed } from "../models/recentlyViewed.model.js";

const createRecentlyViewed = asyncHandler(async (req, res) => {
  const { customerId, products } = req.body;
  if (!customerId) {
    throw new ApiError(400, "Customer id is required!!!");
  }

  const existingViewed = await Viewed.findOne({ customerId });
  if (existingViewed) {
    throw new ApiError(400, "Viewed already exists!!!");
  }

  const viewed = await Viewed.create({
    customerId,
    products: products || [],
  });
  if (!viewed) {
    throw new ApiError(
      500,
      "Something went wrong while creating the viewed!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Viewed created successfully!!!", viewed));
});

const getAllRecentlyViewed = asyncHandler(async (req, res) => {
  const viewed = await Viewed.find();
  if (!viewed) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the Recently viewed products!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Recently viewed products sent!!!", viewed));
});

const addProduct = asyncHandler(async (req, res) => {
  const { productId } = req.query;
  if (!productId) {
    throw new ApiError(400, "Product id is required");
  }

  const customerId = req.customer._id;
  let viewed = await Viewed.findOne({ customerId });
  if (!viewed) {
    viewed = await Viewed.create({ customerId });
    if (!viewed) {
      throw new ApiError(
        500,
        "Something went wrong while creating the viewed!!!"
      );
    }
  }

  const updatedProducts = viewed.products;
  const productObjectId = new mongoose.Types.ObjectId(productId);

  if (viewed.products.some((id) => id.equals(productObjectId))) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Product already exists!!!", viewed));
  }

  updatedProducts.push(productId);

  const updatedViewed = await Viewed.findByIdAndUpdate(
    viewed._id,
    { $set: { products: updatedProducts } },
    { new: true }
  );
  if (!updatedViewed) {
    throw new ApiError(
      500,
      "Something went wrong while updating the viewed!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Product added successfully!!!", updatedViewed));
});

const removeProduct = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    throw new ApiError(400, "Product id is required");
  }

  const customerId = req.customer._id;
  let viewed = await Viewed.findOne({ customerId });

  const availableProducts = viewed.products.filter((el) => el === id);

  const updatedViewed = await Viewed.findByIdAndUpdate(
    viewed._id,
    { $set: { products: availableProducts } },
    { new: true }
  );
  if (!updatedViewed) {
    throw new ApiError(
      500,
      "Something went wrong while updating the viewed!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Product added successfully!!!", updatedViewed));
});

const viewViewed = asyncHandler(async (req, res) => {
  const customerId = req.customer._id;

  let viewed = await Viewed.findOne({ customerId });
  if (!viewed) {
    viewed = await Viewed.create({ customerId });
    if (!viewed) {
      throw new ApiError(
        500,
        "Something went wrong while creating the viewed!!!"
      );
    }
  }

  res.status(200).json(new ApiResponse(200, "Viewed sent!!!", viewed));
});

export {
  createRecentlyViewed,
  getAllRecentlyViewed,
  addProduct,
  removeProduct,
  viewViewed,
};

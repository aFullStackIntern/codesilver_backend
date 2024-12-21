import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Wishlist } from "../models/wishlist.model.js";
import mongoose from "mongoose";

const createWishlist = asyncHandler(async (req, res) => {
  const { customerId, products } = req.body;
  if (!customerId) {
    throw new ApiError(400, "Customer id is required!!!");
  }

  const existingWishlist = await Wishlist.findOne({ customerId });
  if (existingWishlist) {
    throw new ApiError(400, "Wishlist already exists!!!");
  }

  const wishlist = await Wishlist.create({
    customerId,
    products: products || [],
  });
  if (!wishlist) {
    throw new ApiError(
      500,
      "Something went wrong while creating the wishlist!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Wishlist created successfully!!!", wishlist));
});

const getAllWishlists = asyncHandler(async (req, res) => {
  const wishlists = await Wishlist.find();
  if (!wishlists) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the wishlists!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Wishlist fetched!!!", wishlists));
});

const addProduct = asyncHandler(async (req, res) => {
  const { productId } = req.query;
  if (!productId) {
    throw new ApiError(400, "Product id is required");
  }

  const customerId = req.customer._id;
  let wishlist = await Wishlist.findOne({ customerId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ customerId });
    if (!wishlist) {
      throw new ApiError(
        500,
        "Something went wrong while creating the wishlist!!!"
      );
    }
  }

  const productObjectId = new mongoose.Types.ObjectId(productId);
  if (wishlist.products.some((id) => id.equals(productObjectId))) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Product already exists!!!", wishlist));
  }

  const updatedProducts = wishlist.products;
  updatedProducts.push(productId);
  const updatedWishlist = await Wishlist.findByIdAndUpdate(
    wishlist._id,
    { $set: { products: updatedProducts } },
    { new: true }
  );
  if (!updatedWishlist) {
    throw new ApiError(
      500,
      "Something went wrong while updating the wishlist!!!"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Product added successfully!!!", updatedWishlist)
    );
});

const removeProduct = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    throw new ApiError(400, "Product id is required");
  }

  const customerId = req.customer._id;
  let wishlist = await Wishlist.findOne({ customerId });

  const availableProducts = wishlist.products.filter((el) => el === id);

  const updatedWishlist = await Wishlist.findByIdAndUpdate(
    wishlist._id,
    { $set: { products: availableProducts } },
    { new: true }
  );
  if (!updatedWishlist) {
    throw new ApiError(
      500,
      "Something went wrong while updating the wishlist!!!"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Product added successfully!!!", updatedWishlist)
    );
});

const viewWishlist = asyncHandler(async (req, res) => {
  const customerId = req.customer._id;

  let wishlist = await Wishlist.findOne({ customerId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ customerId });
    if (!wishlist) {
      throw new ApiError(
        500,
        "Something went wrong while creating the wishlist!!!"
      );
    }
  }

  res.status(200).json(new ApiResponse(200, "Wishlist sent!!!", wishlist));
});

export {
  createWishlist,
  getAllWishlists,
  addProduct,
  removeProduct,
  viewWishlist,
};

import { Cart } from "../models/cart.model.js";
import { Products } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const createCart = asyncHandler(async (req, res) => {
  const exists = await Cart.findOne({ customerId: req.customer._id });
  if (exists) {
    throw new ApiError(400, "Cart already exists");
  }
  const {
    discountId,
    notes,
    isGift,
    discountCode,
    totalWt,
    eta,
    countryCode,
    address,
  } = req.body;

  if (!totalWt || !eta || !countryCode || !address) {
    throw new ApiError(400, "Fill all the required fields!!!");
  }

  const customerId = req.customer._id;

  const cart = await Cart.create({
    customerId,
    discountId: discountId || undefined,
    isGift,
    products: [],
    notes,
    discountCode,
    price: 0,
    totalWt: 0,
    finalPrice: 0,
    eta,
    countryCode,
    address,
  });
  if (!cart) {
    throw new ApiError(500, "Something went wrong while creating the cart");
  }

  res.status(200).json(new ApiResponse(200, "Cart created!!!", cart));
});

const addProducts = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ customerId: req.customer._id });
  if (!cart) {
    throw new ApiError(400, "Cart not found!!!");
  }

  const { products } = req.body;
  if (!products) {
    throw new ApiError(400, "No product selected!!!");
  }

  const product = await Products.findOne({ _id: products });
  if (!product) {
    throw new ApiError(400, "Product not found!!!");
  }

  const newPrice = product.price + cart.price;

  const newProducts = cart.products;
  newProducts.push(products);

  const updatedCart = await Cart.findByIdAndUpdate(
    cart._id,
    { $set: { products: newProducts, price: newPrice } },
    { new: true }
  );

  res.status(200).json(new ApiResponse(200, "Cart updated!!!", updatedCart));
});

const removeProduct = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ customerId: req.customer._id });
  if (!cart) {
    throw new ApiError(400, "Cart not found!!!");
  }

  const { products } = req.body;
  if (!products) {
    throw new ApiError(400, "No product selected!!!");
  }

  const product = await Products.findOne({ _id: products });
  if (!product) {
    throw new ApiError(400, "Product not found!!!");
  }

  const availableProducts = cart.products;
  let productObjectId = new mongoose.Types.ObjectId(products);
  const newProducts = [];
  let newPrice = cart.price;

  for (let i = 0; i < availableProducts.length; i++) {
    if (!availableProducts[i].equals(productObjectId)) {
      newProducts.push(availableProducts[i]);
    } else {
      newPrice = newPrice - product.price;
    }
  }
  const updatedCart = await Cart.findByIdAndUpdate(
    cart._id,
    {
      $set: { products: newProducts, price: newPrice },
    },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Product removed successfully!!!", updatedCart));
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ customerId: req.customer._id });
  if (!cart) {
    throw new ApiError(400, "Cart not found!!!");
  }

  res.status(200).json(new ApiResponse(200, "Cart found!!!", cart));
});

const deleteCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ customerId: req.customer._id });
  if (!cart) {
    throw new ApiError(400, "Cart not found!!!");
  }

  const deletedCart = await Cart.findByIdAndDelete(cart._id);
  if (!deletedCart) {
    throw new ApiError(400, "Something went wrong while deleting the cart!!!");
  }

  res.status(200).json(new ApiResponse(200, "Cart deleted successfully!!!"));
});

export { createCart, addProducts, removeProduct, getCart, deleteCart };

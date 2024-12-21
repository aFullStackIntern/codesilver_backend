import { Cart } from "../models/cart.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createCart = asyncHandler(async (req, res) => {
  const exists = await Cart.findOne({ customerId: req.params.id });
  if (exists) {
    throw new ApiError(400, "Cart already exists");
  }
  const {
    products,
    discountId,
    notes,
    discountCode,
    price,
    totalWt,
    finalPrice,
    eta,
    countryCode,
    customerId,
    address,
  } = req.body;

  if (
    !price ||
    !customerId ||
    !totalWt ||
    !finalPrice ||
    !eta ||
    !countryCode ||
    !address
  ) {
    throw new ApiError(400, "Fill all the required fields!!!");
  }

  const cart = await Cart.create(req.body);
  if (!cart) {
    throw new ApiError(500, "Something went wrong while creating the cart");
  }

  res.status(200).json(new ApiResponse(200, "Cart created!!!", cart));
});

const addProducts = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ customerId: req.customer.id });
  if (!cart) {
    throw new ApiError(400, "Cart not found!!!");
  }

  const { products } = req.body;
  if (!products) {
    throw new ApiError(400, "No product selected!!!");
  }
  const newProducts = cart.products;

  for (let i = 0; i < products.length; i++) {
    newProducts.push(products[i]);
  }

  const updatedCart = await Cart.findByIdAndUpdate(
    cart._id,
    { $set: { products: newProducts } },
    { new: true }
  );

  res.status(200).json(new ApiResponse(200, "Cart updated!!!", updatedCart));
});

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ customerId: req.cutomer.id });
  if (!cart) {
    throw new ApiError(400, "Cart not found!!!");
  }

  res.status(200).json(new ApiResponse(200, "Cart found!!!"), cart);
});

export { createCart, addProducts, getCart };

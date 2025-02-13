import { Cart } from "../models/cart.model.js";
import { Products } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Gifts } from "../models/gift.model.js";
import mongoose from "mongoose";
import { Hampers } from "../models/hamper.model.js";

const createCart = asyncHandler(async (req, res) => {
  const exists = await Cart.findOne({ customerId: req.customer._id });
  if (exists) {
    throw new ApiError(400, "Cart already exists");
  }
  const {
    discountId,
    hamperId,
    notes,
    giftId,
    discountCode,
    hamperMessage,
    totalWt,
    eta,
    countryCode,
    address,
  } = req.body;

  if (!totalWt || !eta || !countryCode || !address) {
    throw new ApiError(400, "Fill all the required fields!!!");
  }

  const customerId = req.customer._id;
  let finalPrice = 0;

  if (giftId) {
    const gift = await Gifts.findOne({ _id: giftId });
    if (!gift) {
      throw new ApiError(400, "Gift not found!!!");
    }
    finalPrice += gift.price;
  }

  if (hamperId) {
    const hamper = await Hampers.findOne({ _id: cart.hamperId });
    if (!hamper) {
      throw new ApiError(400, "No hamper found!!!");
    }
    const hamperPrice = hamper.price;
    finalPrice += hamperPrice;
  }

  if (!hamperId) {
    hamperMessage = undefined;
  }

  const cart = await Cart.create({
    customerId,
    discountId: discountId || undefined,
    giftId: giftId || undefined,
    hamperId: hamperId || undefined,
    hamperMessage: hamperMessage || undefined,
    products: [],
    notes,
    discountCode,
    price: 0,
    totalWt: 0,
    finalPrice,
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
    {
      $set: {
        products: newProducts,
        price: newPrice,
        hamperMessage: message || undefined,
      },
    },
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

const getAllCarts = asyncHandler(async (req, res) => {
  const cart = await Cart.find();
  if (!cart) {
    throw new ApiError(400, "No carts found!!!");
  }

  res.status(200).json(new ApiResponse(200, "Carts found!!!", cart));
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

const updateGift = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ customerId: req.customer._id });
  if (!cart) {
    throw new ApiError(400, "Cart not found!!!");
  }

  let finalPrice = cart.finalPrice;

  const oldGift = await Gifts.findOne({ _id: cart.giftId });

  finalPrice -= oldGift.price;

  const newGiftId = req.query.id;
  if (!newGiftId) {
    throw new ApiError(400, "Gift id not found!!!");
  }

  const gift = await Gifts.findOne({ _id: newGiftId });
  if (!gift) {
    throw new ApiError(400, "Gift not found!!!");
  }

  finalPrice += gift.price;

  const updatedCart = await Cart.findOneAndUpdate(
    cart._id,
    { giftId: gift._id, finalPrice },
    { new: true }
  );

  res.status(200).json(new ApiResponse(200, "Cart updated!!!", updatedCart));
});

const addHamper = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ customerId: req.customer._id });
  if (!cart) {
    throw new ApiError(400, "Cart not found!!!");
  }

  let finalPrice = cart.finalPrice;

  const { hamperId } = req.query;
  if (!hamperId) {
    throw new ApiError(400, "Hamper id is required!!!");
  }

  const hamper = await Hampers.findOne({ _id: hamperId });
  if (!hamper) {
    throw new ApiError(400, "No hamper found!!!");
  }

  const hamperPrice = hamper.price;

  finalPrice += hamperPrice;

  const updatedCart = await Cart.findByIdAndUpdate(
    cart._id,
    {
      $set: { hamperId: hamperId, finalPrice },
    },
    { new: true }
  );
  if (!updatedCart) {
    throw new ApiError(500, "Something went wrong while updating the cart!!!");
  }

  res.status(200).json(new ApiResponse(200, "Cart updated!!!", updatedCart));
});

const removeHamper = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ customerId: req.customer._id });
  if (!cart) {
    throw new ApiError(400, "Cart not found!!!");
  }

  let finalPrice = cart.finalPrice;

  const hamper = await Hampers.findOne({ _id: cart.hamperId });
  if (!hamper) {
    throw new ApiError(400, "No hamper found!!!");
  }

  const hamperPrice = hamper.price;

  finalPrice -= hamperPrice;

  const updatedCart = await Cart.findByIdAndUpdate(
    cart._id,
    {
      $set: { hamperId: undefined, finalPrice },
    },
    { new: true }
  );
  if (!updatedCart) {
    throw new ApiError(500, "Something went wrong while updating the cart!!!");
  }

  res.status(200).json(new ApiResponse(200, "Cart updated!!!", updatedCart));
});

const changeHamper = asyncHandler(async (req, res) => {
  const { hamperId } = req.query;
  if (!hamperId) {
    throw new ApiError(400, "Hamper id is required!!!");
  }

  const newHamper = await Hampers.findOne({ _id: hamperId });
  if (!newHamper) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the hamper!!!"
    );
  }

  const cart = await Cart.findOne({ customerId: req.customer._id });
  if (!cart) {
    throw new ApiError(400, "Cart not found!!!");
  }

  let finalPrice = cart.finalPrice;

  const hamper = await Hampers.findOne({ _id: cart.hamperId });
  if (!hamper) {
    throw new ApiError(400, "No hamper found!!!");
  }

  const hamperPrice = hamper.price;

  finalPrice = finalPrice - hamperPrice + newHamper.price;

  const updatedCart = await Cart.findByIdAndUpdate(
    cart._id,
    {
      $set: { hamperId, finalPrice },
    },
    { new: true }
  );
  if (!updatedCart) {
    throw new ApiError(500, "Something went wrong while updating the cart!!!");
  }

  res.status(200).json(new ApiResponse(200, "Hamper changed!!!", updatedCart));
});

export {
  createCart,
  addProducts,
  removeProduct,
  getCart,
  deleteCart,
  updateGift,
  addHamper,
  removeHamper,
  changeHamper,
  getAllCarts,
};

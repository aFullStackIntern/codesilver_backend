import { Discounts } from "../models/discount.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createDiscount = asyncHandler(async (req, res) => {
  const { typeId, typeName, name, description, status, method, useFrequency } =
    req.body;
  if (
    !typeId ||
    !name ||
    !description ||
    !method ||
    !useFrequency ||
    !typeName
  ) {
    throw new ApiError(400, "Fill all the required fields!!!");
  }

  const discount = await Discounts.create(req.body);
  if (!discount) {
    throw new ApiError(
      500,
      "Something went wrong while creating the discount!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Discount created!!!", discount));
});

const getAllDiscounts = asyncHandler(async (req, res) => {
  const discounts = await Discounts.find();
  if (!discounts) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the discounts!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Discounts fetched!!!", discounts));
});

const updateDiscounts = asyncHandler(async (req, res) => {
  const exists = await Discounts.findOne({ _id: req.params.id });
  if (!exists) {
    throw new ApiError(400, "No discount found!!!");
  }

  const { typeId, typeName, name, description, status, method, useFrequency } =
    req.body;
  if (
    !typeId &&
    !name &&
    !description &&
    !method &&
    !useFrequency &&
    !typeName
  ) {
    throw new ApiError(400, "Fill all the required fields!!!");
  }

  const updatedDiscount = await Discounts.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedDiscount) {
    throw new ApiError(
      500,
      "Something went wrong while updating the discount!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Discount udpated!!!", updatedDiscount));
});

const getDiscountById = asyncHandler(async (req, res) => {
  const discount = await Discounts.findOne({ _id: req.params.id });
  if (!discount) {
    throw new ApiError(400, "No discount found!!!");
  }

  res.status(200).json(new ApiResponse(200, "Discount found!!!", discount));
});

const deleteDiscount = asyncHandler(async (req, res) => {
  const discount = await Discounts.findOne({ _id: req.params.id });
  if (!discount) {
    throw new ApiError(400, "No discount found!!!");
  }

  const deletedDiscount = await Discounts.findByIdAndDelete(req.params.id);
  if (!deletedDiscount) {
    throw new ApiError(
      500,
      "Something went wrong while deleting the discount!!!"
    );
  }
  res.status(200).json(new ApiResponse(200, "Discount deleted!!!"));
});

export {
  createDiscount,
  getAllDiscounts,
  updateDiscounts,
  getDiscountById,
  deleteDiscount,
};

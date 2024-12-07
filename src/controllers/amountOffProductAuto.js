import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AmountOffPdtAuto } from "../models/amountOffProductsAuto.js";

const createDiscount = asyncHandler(async (req, res) => {
  const {
    title,
    discountValueType,
    discountValue,
    availability,
    appliedTo,
    minPurchaseRequirements,
    minPurchaseRequirementsValue,
    combinations,
    startTime,
    endTime,
  } = req.body;

  if (
    title ||
    discountValueType ||
    discountValue ||
    minPurchaseRequirements ||
    minPurchaseRequirementsValue ||
    availability ||
    combinations ||
    startTime ||
    endTime
  ) {
    throw new ApiError(400, "All fields are empty!!!");
  }

  const discount = await AmountOffPdtAuto.create(req.body);
  if (!discount) {
    throw new ApiError(500, "Something went wrong while creating the discount");
  }

  res.status(200).json(new ApiResponse(200, "Discount created", discount));
});

const getAllDiscounts = asyncHandler(async (req, res) => {
  const discounts = await AmountOffPdtAuto.find();
  if (!discounts) {
    throw new ApiError(
      500,
      "Somehting went wrong while fetching the discounts"
    );
  }

  res.status(200).json(200, "Disconts fetched", discounts);
});

const updateDiscount = asyncHandler(async (req, res) => {
  const exists = await AmountOffPdtAuto.findOne({ _id: req.params.id });
  if (!exists) {
    throw new ApiResponse(400, "No discount found!!!");
  }

  const {
    title,
    discountValueType,
    discountValue,
    availability,
    appliedTo,
    minPurchaseRequirements,
    minPurchaseRequirementsValue,
    combinations,
    startTime,
    endTime,
  } = req.body;
  if (
    title &&
    discountValueType &&
    appliedTo &&
    discountValue &&
    minPurchaseRequirements &&
    minPurchaseRequirementsValue &&
    availability &&
    combinations &&
    startTime &&
    endTime
  ) {
    throw new ApiError(400, "All fields are empty!!!");
  }

  const updatedDiscount = await AmountOffPdtAuto.findByIdAndUpdate(
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
    .json(new ApiResponse(200, "Update discount!!!", updatedDiscount));
});

const getDiscountById = asyncHandler(async (req, res) => {
  const discount = await AmountOffPdtAuto.findOne({ _id: req.params.id });
  if (!discount) {
    throw new ApiError(400, "No discount found!!!");
  }

  res.status(200).json(200, "Discount sent!!!", discount);
});

const deleteDiscount = asyncHandler(async (req, res) => {
  const discount = await AmountOffPdtAuto.findOne({ _id: req.params.id });
  if (!discount) {
    throw new ApiError(400, "No discount found!!!");
  }

  const deletedDiscount = await AmountOffPdtAuto.findByIdAndDelete();
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
  updateDiscount,
  getAllDiscounts,
  getDiscountById,
  deleteDiscount,
};

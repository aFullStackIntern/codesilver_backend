import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { BuyXGetYCode } from "../models/buyXGetYCode.js";

const createDiscount = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    code,
    customerBuys,
    customerBuysQnt,
    appliedTo,
    customerGetQnt,
    anyItemFrom,
    discountValueType,
    discountValue,
    usesPerOrder,
    customersEligible,
    combinations,
    startTime,
    endTime,
  } = req.body;

  if (
    !code ||
    !customerBuys ||
    !customerBuysQnt ||
    !discountValueType ||
    !discountValue ||
    !appliedTo ||
    !customerGetQnt ||
    !anyItemFrom ||
    !combinations ||
    !endTime ||
    !startTime
  ) {
    throw new ApiError(400, "Fill the required fields!!!");
  }

  const discount = await BuyXGetYCode.create(req.body);
  if (!discount) {
    throw new ApiError(500, "Something went wrong while creating the discount");
  }

  res.status(200).json(new ApiResponse(200, "Discount created", discount));
});

const getAllDiscounts = asyncHandler(async (req, res) => {
  const discounts = await BuyXGetYCode.find();
  if (!discounts) {
    throw new ApiError(
      500,
      "Somehting went wrong while fetching the discounts"
    );
  }

  res.status(200).json(new ApiResponse(200, "Disconts fetched", discounts));
});

const updateDiscount = asyncHandler(async (req, res) => {
  const exists = await BuyXGetYCode.findOne({ _id: req.params.id });
  if (!exists) {
    throw new ApiError(400, "No discount found!!!");
  }

  const {
    code,
    customerBuys,
    customerBuysQnt,
    appliedTo,
    customerGetQnt,
    anyItemFrom,
    discountValueType,
    discountValue,
    usesPerOrder,
    customersEligible,
    combinations,
    startTime,
    endTime,
  } = req.body;
  if (
    code &&
    customerBuys &&
    customerBuysQnt &&
    appliedTo &&
    customerGetQnt &&
    anyItemFrom &&
    discountValueType &&
    discountValue &&
    usesPerOrder &&
    customersEligible &&
    combinations &&
    startTime &&
    endTime
  ) {
    throw new ApiError(400, "All fields are empty!!!");
  }

  const updatedDiscount = await BuyXGetYCode.findByIdAndUpdate(
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
  const discount = await BuyXGetYCode.findOne({ _id: req.params.id });
  if (!discount) {
    throw new ApiError(400, "No discount found!!!");
  }

  res.status(200).json(new ApiResponse(200, "Discount sent!!!", discount));
});

const deleteDiscount = asyncHandler(async (req, res) => {
  const discount = await BuyXGetYCode.findOne({ _id: req.params.id });
  if (!discount) {
    throw new ApiError(400, "No discount found!!!");
  }

  const deletedDiscount = await BuyXGetYCode.findByIdAndDelete(req.params.id);
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

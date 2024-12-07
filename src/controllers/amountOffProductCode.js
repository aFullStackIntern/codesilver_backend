import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AmountOffPdtCode } from "../models/amountOffProductsCode.js";

const createDiscount = asyncHandler(async (req, res) => {
  const {
    code,
    discountValueType,
    discountValue,
    appliedTo,
    minPurchaseRequirements,
    minPurchaseRequirementsValue,
    customersEligible,
    uses,
    combinations,
    startTime,
    endTime,
  } = req.body;

  if (
    !code ||
    !discountValueType ||
    !discountValue ||
    !appliedTo ||
    !minPurchaseRequirements ||
    !minPurchaseRequirementsValue ||
    !customersEligible ||
    !uses ||
    !combinations ||
    !startTime ||
    !endTime
  ) {
    throw new ApiError(400, "All fields are required!!!");
  }

  const discount = await AmountOffPdtCode.create(req.body);
  if (!discount) {
    throw new ApiError(500, "Something went wrong while creating the discount");
  }

  res.status(200).json(new ApiResponse(200, "Discount created", discount));
});

const getAllDiscounts = asyncHandler(async (req, res) => {
  const discounts = await AmountOffPdtCode.find();
  if (!discounts) {
    throw new ApiError(
      500,
      "Somehting went wrong while fetching the discounts"
    );
  }

  res.status(200).json(new ApiResponse(200, "Disconts fetched", discounts));
});

const updateDiscount = asyncHandler(async (req, res) => {
  const exists = await AmountOffPdtCode.findOne({ _id: req.params.id });
  if (!exists) {
    throw new ApiError(400, "No discount found!!!");
  }

  const {
    code,
    discountValueType,
    discountValue,
    appliedTo,
    minPurchaseRequirements,
    minPurchaseRequirementsValue,
    customersEligible,
    uses,
    combinations,
    startTime,
    endTime,
  } = req.body;
  if (
    !code &&
    !discountValueType &&
    !appliedTo &&
    !discountValue &&
    !minPurchaseRequirements &&
    !minPurchaseRequirementsValue &&
    !customersEligible &&
    !uses &&
    !combinations &&
    !startTime &&
    !endTime
  ) {
    throw new ApiError(400, "All fields are empty!!!");
  }

  const updatedDiscount = await AmountOffPdtCode.findByIdAndUpdate(
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
  const discount = await AmountOffPdtCode.findOne({ _id: req.params.id });
  if (!discount) {
    throw new ApiError(400, "No discount found!!!");
  }

  res.status(200).json(new ApiResponse(200, "Discount sent!!!", discount));
});

const deleteDiscount = asyncHandler(async (req, res) => {
  const discount = await AmountOffPdtCode.findOne({ _id: req.params.id });
  if (!discount) {
    throw new ApiError(400, "No discount found!!!");
  }
  console.log(discount);

  const deletedDiscount = await AmountOffPdtCode.findByIdAndDelete(
    req.params.id
  );
  console.log(deletedDiscount);
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

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Varients } from "../models/varient.model.js";

const createVarient = asyncHandler(async (req, res) => {
  const { noOfProducts, name, values, prices } = req.body;
  if (!noOfProducts || !name || !values || !prices) {
    throw new ApiError(400, "Fill all the required fields!!!");
  }

  const varient = await Varients.create(req.body);
  if (!varient) {
    throw new ApiError(
      500,
      "Something went wrong while creating the varient!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Varient created successfully!!!", varient));
});

const getAllVarients = asyncHandler(async (req, res) => {
  const allVarients = await Varients.find();
  if (!allVarients) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the varients!!!"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Varients fetched successfully!!!", allVarients)
    );
});

const updateVarient = asyncHandler(async (req, res) => {
  const existingVarient = await Varients.findOne({ _id: req.params.id });
  if (!existingVarient) {
    throw new ApiError(400, "No varient found");
  }

  const { noOfProducts, name, values, prices } = req.body;

  if (!noOfProducts && !name && !values && !prices) {
    throw new ApiError(400, "ALl fields are empty!!!");
  }

  const updatedVarient = await Varients.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, "Varient updated successfully", updatedVarient));
});

const deleteVarient = asyncHandler(async (req, res) => {
  const existingVarient = await Varients.findOne({ _id: req.params.id });
  if (!existingVarient) {
    throw new ApiError(400, "No varient found");
  }

  const deletedVarient = await Varients.findByIdAndDelete(req.params.id);

  if (!deletedVarient) {
    throw new ApiError(
      500,
      "Something went wrong while deleting the varient!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Varient deleted!!!"));
});

const getById = asyncHandler(async (req, res) => {
  const varient = await Varients.findOne({ _id: req.params.id });
  if (!varient) {
    throw new ApiError(400, "No varient found");
  }

  res.status(200).json(new ApiResponse(200, "Varient sent", varient));
});

export { createVarient, getAllVarients, updateVarient, deleteVarient, getById };

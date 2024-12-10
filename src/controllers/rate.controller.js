import { Rates } from "../models/rate.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createRate = asyncHandler(async (req, res) => {
  const { type, name, description, price, minWt, maxWt } = req.body;
  if (!type || !name || !description || !price || !minWt || !maxWt) {
    throw new ApiError(400, "Fill all the required fields!!!");
  }

  const rate = await Rates.create(req.body);
  if (!rate) {
    throw new ApiError(500, "Something went wrong while creating the rates!!!");
  }

  res.status(200).json(new ApiResponse(200, "Rate created!!!", rate));
});

const getAllRates = asyncHandler(async (req, res) => {
  const rates = await Rates.find();
  if (!rates) {
    throw new ApiError(500, "Something went wrong while fetching the rates!!!");
  }

  res.status(200).json(new ApiResponse(200, "Rates fetched!!!", rates));
});

const updateRates = asyncHandler(async (req, res) => {
  const rate = await Rates.findOne({ _id: req.params.id });
  if (!rate) {
    throw new ApiError(400, "No rate found!!!");
  }

  const { type, name, description, price, minWt, maxWt } = req.body;
  if (!type && !name && !description && !price && !minWt && !maxWt) {
    throw new ApiError(400, "Fill all the required fields!!!");
  }

  const updatedRate = await Rates.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedRate) {
    throw new ApiError(500, "Something went wrong while updating the rate!!!");
  }

  res.status(200).json(new ApiResponse(200, "Rate updated!!!", updatedRate));
});

const getRateById = asyncHandler(async (req, res) => {
  const rate = await Rates.findOne({ _id: req.params.id });
  if (!rate) {
    throw new ApiError(400, "No rate found!!!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Rate fetched successfull!!!", rate));
});

const deleteRate = asyncHandler(async (req, res) => {
  const rate = await Rates.findOne({ _id: req.params.id });
  if (!rate) {
    throw new ApiError(400, "No rate found!!!");
  }

  const deletedRate = await Rates.findByIdAndDelete(req.params.id);
  if (!deletedRate) {
    throw new ApiError(400, "Something went wrong while deleting the rate!!!");
  }

  res.status(200).json(new ApiResponse(200, "Rate deleted"));
});

export { createRate, getAllRates, updateRates, getRateById, deleteRate };

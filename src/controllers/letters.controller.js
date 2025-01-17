import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Letters } from "../models/letters.model.js";

const createLetter = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    throw new ApiError(400, "Fill all the fields!!!");
  }

  const letterPrice = await Letters.create(req.body);
  if (!letterPrice) {
    throw new ApiError(
      500,
      "Something went wrong while updating the Letters!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Letter pricing created!!!", letterPrice));
});

const getAllLetters = asyncHandler(async (req, res) => {
  const letters = await Letters.find();
  if (!letters) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the letters!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Letter fetched successfully!!!", letters));
});

const getLetterById = asyncHandler(async (req, res) => {
  const letterId = req.query.id;
  if (!letterId) {
    throw new ApiError(500, "Letter price id is required!!!");
  }

  const letterPricing = await Letters.findOne({ _id: letterId });
  if (!letterPricing) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the pricing!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Letter pricing fetched!!!", letterPricing));
});

const deleteLetter = asyncHandler(async (req, res) => {
  const letterId = req.query.id;
  if (!letterId) {
    throw new ApiError(500, "Letter price id is required!!!");
  }

  const letterPricing = await Letters.findByIdAndDelete(letterId);
  if (!letterPricing) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the pricing!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Letter pricing deleted!!!"));
});

const updateLetter = asyncHandler(async (req, res) => {
  const letterId = req.query.id;
  if (!letterId) {
    throw new ApiError(500, "Letter price id is required!!!");
  }

  const { name, price } = req.body;
  if (!name && !price) {
    throw new ApiError(400, "All fields are empty!!!");
  }

  const updatedLetterPricing = await Letters.findByIdAndUpdate(
    letterId,
    { $set: req.body },
    { new: true }
  );
  if (!updatedLetterPricing) {
    throw new ApiError(
      500,
      "Something went wrong while updating the letter pricing!!!"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Letter pricing updated!!!", updatedLetterPricing)
    );
});

export {
  createLetter,
  getAllLetters,
  getLetterById,
  deleteLetter,
  updateLetter,
};

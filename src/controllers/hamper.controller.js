import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Hampers } from "../models/hamper.model.js";

const createHamper = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    throw new ApiError(400, "Fill all the required fields!!!");
  }

  const existing = await Hampers.findOne({ name });
  if (existing) {
    throw new ApiError(400, "Hamper alredy exists!!!");
  }

  const hamper = await Hampers.create(req.body);
  if (!hamper) {
    throw new ApiError(
      500,
      "Something went wrong while creating the hamper!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Hamper created successfully!!!", hamper));
});

const getAllHampers = asyncHandler(async (req, res) => {
  const hampers = await Hampers.find();
  if (!hampers) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the hamper!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Hampers fetched!!!", hampers));
});

const getHamperById = asyncHandler(async (req, res) => {
  const id = req.query.id;
  if (!id) {
    throw new ApiError(400, "Id is required!!!");
  }

  const hamper = await Hampers.findOne({ _id: id });
  if (!hamper) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the hamper!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Hamper fetched!!!", hamper));
});

const updateHamper = asyncHandler(async (req, res) => {
  const id = req.query.id;
  if (!id) {
    throw new ApiError(400, "Id is required!!!");
  }

  const { name, price } = req.body;
  if (!name && !price) {
    throw new ApiError(400, "All fields are empty!!!");
  }

  const updatedHamper = await Hampers.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedHamper) {
    throw new ApiError(
      500,
      "Something went wrong while updating the hamper!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Hamper updated!!!", updatedHamper));
});

const deleteHamper = asyncHandler(async (req, res) => {
  const id = req.query.id;
  if (!id) {
    throw new ApiError(400, "Id is required!!!");
  }

  const deletedHamper = await Hampers.findByIdAndDelete(id);
  if (!deletedHamper) {
    throw new ApiError(
      500,
      "Something went wrong while updating the hamper!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Hamper deleted!!!"));
});

const getHamperByName = asyncHandler(async (req, res) => {
  const { name } = req.query.name;
  if (!name) {
    throw new ApiError(400, "Name is required!!!");
  }

  const hamper = await Hampers.findOne({ name });
  if (!hamper) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the hamper!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Hamper fetched!!!", hamper));
});

export {
  createHamper,
  getAllHampers,
  getHamperById,
  updateHamper,
  deleteHamper,
  getHamperByName,
};

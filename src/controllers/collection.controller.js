import { Collections } from "../models/collection.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createCollection = asyncHandler(async (req, res) => {
  const { title, type, description } = req.body;

  if (!title || !type || !description) {
    throw new ApiError(400, "Fill the required fields!!!");
  }

  console.log(req.body);
  console.log(req.files);
  res
    .status(200)
    .json(new ApiResponse(200, "Collection created successfully!!!"));
});

export { createCollection };

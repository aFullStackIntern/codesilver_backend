import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Products } from "../models/product.model.js";
import { Varients } from "../models/varient.model.js";
import { Collections } from "../models/collection.model.js";

const createProduct = asyncHandler(async (req, res) => {
  const {
    weight,
    name,
    price,
    status,
    noOfProducts,
    reviews,
    isDraft,
    description,
    varients,
    tags,
    CollectionId,
    discountId,
  } = req.body;

  if (
    !name &&
    !price &&
    !noOfProducts &&
    !description &&
    !CollectionId & !varients
  ) {
    throw new ApiError(400, "Requried fields are missing!");
  }

  const existingProduct = await Products.findOne({ name });
  if (existingProduct) {
    throw new ApiError(400, "Product already exists!!!");
  }
});

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Products } from "../models/product.model.js";
import { Varients } from "../models/varient.model.js";
import { Collections } from "../models/collection.model.js";
import { Discounts } from "../models/discount.model.js";
import { Reviews } from "../models/review.model.js";

const setReviews = async (productId) => {
  const reviewData = await Reviews.find({ productId });

  if (!reviewData) {
    return 0;
  }

  const len = reviewData.length;
  const sum = 0;

  for (let i = 0; i < len; i++) {
    sum += reviewData[i].rating;
  }

  return sum / len;
};

const createProduct = asyncHandler(async (req, res) => {
  const {
    weight,
    name,
    price,
    status,
    isDraft,
    description,
    varients,
    tags,
    collectionId,
    discountId,
  } = req.body;

  if (
    !name ||
    !weight ||
    !price ||
    !description ||
    !collectionId ||
    !varients
  ) {
    throw new ApiError(400, "Requried fields are missing!");
  }

  const existingProduct = await Products.findOne({ name });
  if (existingProduct) {
    throw new ApiError(400, "Product already exists!!!");
  }

  const imageLocalPath = req.files?.image[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(
      500,
      "Something went wrong while uploading the image on server!!!"
    );
  }

  const medias = [];

  if (!req.files.medias) {
    throw new ApiError(400, "Medias are required!!!");
  }

  for (let i = 0; i < req.files.medias.length; i++) {
    const medium = await uploadOnCloudinary(req.files.medias[i].path);

    if (!medium) {
      throw new ApiError(
        500,
        "Something went wrong while uploading teh image on the server!!!"
      );
    }
    medias.push(medium.url);
  }

  const product = await Products.create({
    image: image.url,
    weight,
    name,
    price,
    status,
    reviews: 0,
    isDraft,
    description,
    medias,
    varients,
    collectionId,
    discountId,
  });

  if (!product) {
    throw new ApiError(
      500,
      "Something went wrong while creating the product!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Product created!!!", product));
});

const updateReviews = asyncHandler(async (req, res) => {
  const product = await Products.findOne({ _id: req.params.id });
  if (!product) {
    throw new ApiError(400, "No product found!!!");
  }

  const review = setReviews(req.params.id);

  const updatedProduct = await Products.findByIdAndUpdate(
    req.params.id,
    { $set: { reviews: review } },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(
      500,
      "Something went wrong while updating the product!!!"
    );
  }
});

const updateImage = asyncHandler(async (req, res) => {
  const product = await Products.findOne({ _id: req.params.id });
  if (!product) {
    throw new ApiError(400, "No product found!!!");
  }

  const imageLocalPath = req.files?.image[0].path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "Something went wrong while updating the image!!!");
  }

  const updatedProduct = await Products.findByIdAndUpdate(
    req.params.id,
    { image: image.url },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(500, "Something went wrong while updating the image!!!");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Image updated successfully!!!", updatedProduct)
    );
});

const updateMedium = asyncHandler(async (req, res) => {
  const product = await Products.findOne({ _id: req.params.id });
  if (!product) {
    throw new ApiError(400, "No product found!!!");
  }

  const { position } = req.body;
  if (!position) {
    throw new ApiError(400, "Position is required!!!");
  }

  const mediumLocalPath = req.files?.medium[0].path;
  if (!mediumLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const medium = await uploadOnCloudinary(mediumLocalPath);
  if (!medium) {
    throw new ApiError(
      500,
      "Something went wrong while updating the medium!!!"
    );
  }

  const medias = product.medias;
  medias[position] = medium.url;

  const updatedProduct = await Products.findByIdAndUpdate(
    req.params.id,
    { medias },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(500, "Something went wrong while updating the image!!!");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Medium updated successfully!!!", updatedProduct)
    );
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Products.findOne({ _id: req.params.id });
  if (!product) {
    throw new ApiError(400, "No product found!!!");
  }

  const { name, status, description, tags, collectionId, discountId } =
    req.body;
  if (
    !name &&
    !status &&
    !description &&
    !tags &&
    !collectionId &&
    !discountId
  ) {
    throw new ApiError(500, "All fields are empty!!!");
  }

  const updatedProduct = await Products.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedProduct) {
    throw new ApiError(
      500,
      "Something went wrong while updating the product!!!"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Product updated!!!", updatedProduct));
});

export {
  createProduct,
  updateReviews,
  updateImage,
  updateMedium,
  updateProduct,
};

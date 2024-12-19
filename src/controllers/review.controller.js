import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Reviews } from "../models/review.model.js";
import { Products } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const setReviews = async (productId) => {
  const reviewData = await Reviews.find({ productId });

  if (!reviewData) {
    return 0;
  }

  let len = reviewData.length;
  let sum = 0;

  for (let i = 0; i < len; i++) {
    sum += reviewData[i].rating;
  }

  return sum / len;
};

const createReview = asyncHandler(async (req, res) => {
  const { review, rating, customerId, productId } = req.body;

  if (!review || !rating || !customerId || !productId) {
    throw new ApiError(400, "Some fields are missing!!!");
  }

  const existingReview = await Reviews.findOne({ customerId });
  if (existingReview) {
    throw new ApiError(400, "You can only review once!!!");
  }

  const createdReview = await Reviews.create(req.body);
  if (!createdReview) {
    throw new ApiError(
      500,
      "Something went wrong while creating the review!!!"
    );
  }

  const updatedReview = await setReviews(productId);
  if (!updatedReview) {
    throw new ApiError("Something went wrong while updating review!!!");
  }

  const updatedProduct = await Products.findByIdAndUpdate(
    productId,
    { $set: { reviews: updatedReview } },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError("Something went wrong while updating the product!!!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Review created!!!", createdReview));
});

const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Id is required!!!");
  }

  const review = await Reviews.findOne({ _id: id });
  if (!review) {
    throw new ApiError(400, "No review found!!!");
  }

  const deletedReview = await Reviews.findByIdAndDelete(id);
  if (!deletedReview) {
    throw new ApiError(
      500,
      "Something went wrong while deleting the review!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Review deleted!!!"));
});

const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    throw new ApiError(400, "Id is required!!!");
  }

  const reviews = await Reviews.find({ productId });
  if (!reviews) {
    throw new ApiError(400, "Id is required!!!");
  }

  res.status(200).json(new ApiResponse(200, "Reviews sent!!!", reviews));
});

const updateReviewStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Id is required!!!");
  }

  const review = await Reviews.findOne({ _id: id });
  if (!review) {
    throw new ApiError(400, "Review not found!!!");
  }

  const updatedReview = await Reviews.findByIdAndUpdate(
    id,
    { $set: { status: !review.status } },
    { new: true }
  );

  if (!updatedReview) {
    throw new ApiError(
      500,
      "Something went wrong while updating the review!!!"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Review updated successfully!!!", updatedReview)
    );
});

const getCustomerReviews = asyncHandler(async (req, res) => {
  const { customerId } = req.params;
  if (!customerId) {
    throw new ApiError(400, "Id is required!!!");
  }

  const reviews = await Reviews.find({ customerId });
  if (!reviews) {
    throw new ApiError(400, "Id is required!!!");
  }

  res.status(200).json(new ApiResponse(200, "Reviews sent!!!", reviews));
});

const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Reviews.find();
  if (!reviews) {
    throw new ApiError(
      400,
      "Something went wrong while fetching the reviews!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Reviews fetched!!!", reviews));
});

export {
  createReview,
  deleteReview,
  getProductReviews,
  updateReviewStatus,
  getAllReviews,
  getCustomerReviews,
};

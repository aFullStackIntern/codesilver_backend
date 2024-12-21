import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Comments } from "../models/comment.model.js";
import { Reviews } from "../models/review.model.js";
import { Blogs } from "../models/blog.model.js";
import { Customers } from "../models/customer.model.js";

const createComment = asyncHandler(async (req, res) => {
  const { comment, reviewId, blogId } = req.body;
  if (!comment) {
    throw new ApiError(400, "Fill all the required fields!!!");
  }

  if (!blogId && !reviewId) {
    throw new ApiError(400, "Blog Id or Review Id is missing!!!");
  }

  const customerId = req.customer._id;

  const createdComment = await Comments.create({
    comment,
    customerId,
    blogId: blogId || undefined,
    reviewId: reviewId || undefined,
  });

  if (!createdComment) {
    throw new ApiError(
      500,
      "Something went wrong while creating the comment!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Comment created!!!", createdComment));
});

const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comments.find();
  if (!comments) {
    throw new ApiError(500, "Something went wrong while fetching the error!!!");
  }

  res.status(200).json(new ApiResponse(200, "Comments fetched!!!", comments));
});

const getAllCommentsByReview = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    throw new ApiError(400, "Id is required!!!");
  }

  const review = await Reviews.findOne({ _id: id });
  if (!review) {
    throw new ApiError(400, "Review not found!!!");
  }

  const comments = await Comments.find({ reviewId: id });
  if (!comments) {
    throw new ApiError(
      400,
      "Something went wrong while fetching the comments!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Comments fetched!!!", comments));
});

const getAllCommentsByBlog = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    throw new ApiError(400, "Id is required!!!");
  }

  const blog = await Blogs.findOne({ _id: id });
  if (!blog) {
    throw new ApiError(400, "Review not found!!!");
  }

  const comments = await Comments.find({ blogId: id });
  if (!comments) {
    throw new ApiError(
      400,
      "Something went wrong while fetching the comments!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Comments fetched!!!", comments));
});

const getAllCommentsByCustomer = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    throw new ApiError(400, "Id is required!!!");
  }

  const customer = await Customers.findOne({ _id: id });
  if (!customer) {
    throw new ApiError(400, "Review not found!!!");
  }

  const comments = await Comments.find({ customerId: id });
  if (!comments) {
    throw new ApiError(
      400,
      "Something went wrong while fetching the comments!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Comments fetched!!!", comments));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Id is required!!!");
  }

  const existingComment = await Comments.findOne({ _id: id });
  if (!existingComment) {
    throw new ApiError(400, "Comment not found!!!");
  }

  const deletedComment = await Comments.findByIdAndDelete(id);
  if (!deletedComment) {
    throw new ApiError(
      400,
      "Something went wrong while deleting the comment!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Comment deleted successfully!!!"));
});

export {
  createComment,
  getAllComments,
  getAllCommentsByReview,
  getAllCommentsByBlog,
  getAllCommentsByCustomer,
  deleteComment,
};

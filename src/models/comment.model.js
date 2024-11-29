import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    reviewId: {
      type: mongoose.Schema.ObjectId,
      ref: "Review",
    },
    blogId: {
      type: mongoose.Schema.ObjectId,
      ref: "Blog",
    },
    customerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
      required: true,
    },
  },
  { timestamps: true }
);

export const Comments = mongoose.model("Comment", commentSchema);

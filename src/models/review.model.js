import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    customerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

export const Reviews = mongoose.model("Review", reviewSchema);

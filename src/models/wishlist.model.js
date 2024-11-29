import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
      required: true,
    },
    products: {
      type: [mongoose.Schema.ObjectId],
      ref: "Product",
    },
  },
  { timestamps: true }
);

export const Wishlist = mongoose.model("Wishlist", viewedSchema);

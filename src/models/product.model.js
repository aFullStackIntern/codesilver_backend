import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    noOfProducts: {
      type: Number,
    },
    reviews: {
      type: Number,
    },
    isDraft: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: true,
    },
    medias: {
      type: [String],
      required: true,
    },
    varients: {
      type: [mongoose.Schema.ObjectId],
      ref: "Varient",
      required: true,
    },
    tags: {
      type: [String],
    },
    collectionId: {
      type: mongoose.Schema.ObjectId,
      ref: "Collection",
      required: true,
    },
    discountId: {
      type: mongoose.Schema.ObjectId,
      ref: "Discount",
    },
  },
  { timestamps: true }
);

export const Products = mongoose.model("Product", productSchema);

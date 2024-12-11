import mongoose, { Schema } from "mongoose";

const varientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    values: {
      type: [String],
    },
    prices: {
      type: [Number],
    },
    noOfProducts: {
      type: [Number],
      required: true,
    },
    weights: {
      type: [Number],
      required: true,
    },
  },
  { timestamps: true }
);

export const Varients = mongoose.model("Varient", varientSchema);

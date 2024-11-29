import mongoose, { Schema } from "mongoose";

const varientSchema = new Schema(
  {
    noOfProducts: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    values: {
      type: [String],
    },
    prices: {
      type: [String],
    },
  },
  { timestamps: true }
);

export const Varients = mongoose.model("Varient", varientSchema);

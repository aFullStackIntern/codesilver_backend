import mongoose, { Schema } from "mongoose";

const rateSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    minWt: {
      type: Number,
      required: true,
    },
    maxWt: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Rates = mongoose.model("Rate", rateSchema);

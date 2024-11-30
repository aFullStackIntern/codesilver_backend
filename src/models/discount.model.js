import mongoose, { Schema } from "mongoose";

const discountSchema = new Schmea(
  {
    typeId: {
      type: string,
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
    status: {
      type: Boolean,
      default: true,
    },
    method: {
      type: String,
      required: true,
    },
    useFrequency: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export const Discounts = mongoose.model("Discount", discountSchema);

import mongoose, { Schema } from "mongoose";

const discountSchema = new Schema(
  {
    typeId: {
      type: String,
      required: true,
    },
    typeName: {
      type: String,
      required: true,
      enum: ["Product", "Order", "Shipping", "BuyGet"],
    },
    name: {
      type: String,
      required: true,
    },
    discountCode: {
      type: String,
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

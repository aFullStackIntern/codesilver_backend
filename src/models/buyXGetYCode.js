import mongoose, { Schema } from "mongoose";

const buyXGetYCodeSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    customerBuys: {
      type: String,
      required: true,
    },
    customerBuysQnt: {
      type: Number,
      required: true,
    },
    appliedTo: {
      type: String,
      required: true,
    },
    customerGetQnt: {
      type: Number,
      required: true,
    },
    anyItemFrom: {
      type: String,
      required: true,
    },
    discountValueType: {
      type: String,
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    usesPerOrder: {
      type: Number,
      default: 1,
    },
    customersEligible: {
      type: [mongoose.Schema.ObjectId],
      ref: "Customer",
    },
    combinations: {
      type: String,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const BuyXGetYCode = mongoose.model("BuyXGetYCode", buyXGetYCodeSchema);

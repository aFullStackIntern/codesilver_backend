import mongoose, { Schema } from "mongoose";

const amountOffPdtAutoSchema = new Schema(
  {
    title: {
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
    availability: {
      type: String,
      required: true,
    },
    appliedTo: {
      type: String,
      required: true,
    },
    minPurchaseRequirements: {
      type: String,
      required: true,
    },
    minPurchaseRequirementsValue: {
      type: String,
      required: true,
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

export const amountOffPdtAuto = mongoose.model(
  "AmountOffPdtAuto",
  amountOffPdtAutoSchema
);

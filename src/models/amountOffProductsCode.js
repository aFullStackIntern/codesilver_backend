import mongoose, { Schema } from "mongoose";

const amountOffPdtCodeSchema = new Schema(
  {
    code: {
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
    customersEligible: {
      type: [mongoose.Schema.ObjectId],
      ref: "Customer",
    },
    uses: {
      type: Number,
      default: 1,
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
    channel: {
      type: String,
    },
  },
  { timestamps: true }
);

export const amountOffPdtCode = mongoose.model(
  "AmountOffPdtCode",
  amountOffPdtCodeSchema
);

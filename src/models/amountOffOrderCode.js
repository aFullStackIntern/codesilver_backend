import mongoose, { Schema } from "mongoose";

const amountOffOrderCodeSchema = new Schema(
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
  },
  { timestamps: true }
);

export const AmountOffOrderCode = mongoose.model(
  "AmountOffOrderCode",
  amountOffOrderCodeSchema
);

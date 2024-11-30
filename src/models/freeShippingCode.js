import mongoose, { Schema } from "mongoose";

const freeShippingCodeSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    countriesCode: {
      type: [String],
      required: true,
    },
    shippingRatesExclusion: {
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
      type: [String],
      required: true,
    },
    uses: {
      type: Number,
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

export const FreeShippingCode = mongoose.model(
  "FreeShippingCode",
  freeShippingCodeSchema
);

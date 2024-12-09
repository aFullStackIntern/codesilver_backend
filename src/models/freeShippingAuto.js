import mongoose, { Schema } from "mongoose";

const freeShippingAutoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    countriesCode: {
      type: [String],
      required: true,
    },
    shippingRatesExclusion: {
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

export const FreeShippingAuto = mongoose.model(
  "FreeShippingAuto",
  freeShippingAutoSchema
);

import mongoose, { Schema } from "mongoose";

const zoneSchema = new Schema(
  {
    countryCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    rates: {
      type: [mongoose.Schema.ObjectId],
      ref: "Rate",
      required: true,
    },
  },
  { timestamps: true }
);

export const Zones = mongoose.model("Zone", zoneSchema);

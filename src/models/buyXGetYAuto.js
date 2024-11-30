import mongoose, { Schema } from "mongoose";

const buyXGetYAutoSchema = new Schema(
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
    at: {
      type: String,
      required: true,
    },
    usesPerOrder: {
      type: Number,
      default: 1,
    },

    availability: {
      type: "String",
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

export const BuyXGetYAuto = mongoose.model("BuyXGetYAuto", buyXGetYAutoSchema);

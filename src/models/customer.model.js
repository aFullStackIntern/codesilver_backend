import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    subscribed: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: true,
    },
    totalOrders: {
      type: [mongoose.Schema.ObjectId],
      ref: "Order",
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    countryCode: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    totalAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Customers = mongoose.model("Customer", customerSchema);

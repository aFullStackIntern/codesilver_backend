import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
    },
    channel: {
      type: String,
    },
    deliveryMethod: {
      type: String,
    },
    amount: {
      type: Number,
    },
    address: {
      type: String,
      required: true,
    },
    progress: {
      type: [String],
      required: true,
    },
    notes: {
      type: String,
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
    isAbandoned: {
      type: Boolean,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isPaid: {
      type: Boolean,
    },
    isFullfilled: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    products: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

export const Orders = mongoose.model("Order", orderSchema);

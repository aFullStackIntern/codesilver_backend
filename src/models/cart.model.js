import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    products: {
      type: [mongoose.Schema.ObjectId],
      ref: "Product",
      // requried: true,
    },
    discountId: {
      type: mongoose.Schema.ObjectId,
      ref: "Discount",
    },
    isGift: {
      type: Boolean,
      default: false,
    },
    giftPrice: {
      type: Number,
      default: 20,
    },
    customerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
    },
    notes: {
      type: String,
    },
    discountCode: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalWt: {
      type: Number,
      required: true,
    },
    finalPrice: {
      type: Number,
      required: true,
    },
    eta: {
      type: String,
      required: true,
    },
    countryCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);

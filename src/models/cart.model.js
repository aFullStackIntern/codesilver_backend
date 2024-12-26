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
    giftId: {
      type: mongoose.Schema.ObjectId,
      ref: "Gift",
    },
    hamperId: {
      type: mongoose.Schema.ObjectId,
      ref: "Hamper",
    },
    hamperMessage: {
      type: String,
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

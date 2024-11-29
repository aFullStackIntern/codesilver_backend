import mongoose, { Schema } from "mongoose";

const viewedSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
      required: true,
    },
    products: {
      type: [mongoose.Schema.ObjectId],
      ref: "Product",
    },
  },
  { timestamps: true }
);

export const Viewed = mongoose.model("Viewed", viewedSchema);

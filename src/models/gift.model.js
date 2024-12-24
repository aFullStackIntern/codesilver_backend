import mongoose, { Schema } from "mongoose";

const giftsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Gifts = mongoose.model("Gift", giftsSchema);

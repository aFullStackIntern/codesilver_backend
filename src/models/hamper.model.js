import mongoose, { Schema } from "mongoose";

const hamperSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Hampers = mongoose.model("Hamper", hamperSchema);

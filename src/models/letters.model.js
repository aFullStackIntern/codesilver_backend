import mongoose, { Schema } from "mongoose";

const letterSchema = new Schema(
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

export const Letters = mongoose.model("Letter", letterSchema);

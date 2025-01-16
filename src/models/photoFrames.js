import mongoose, { Schema } from "mongoose";

const photoFrameSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    productId: {
      type: mongoose.Schema.ObjectId,
    },
  },
  { timestamps: true }
);

export const PhotoFrames = mongoose.model("PhotoFrame", photoFrameSchema);

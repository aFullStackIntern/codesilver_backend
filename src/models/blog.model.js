import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    visiblity: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Blogs = mongoose.module("Blog", blogSchema);

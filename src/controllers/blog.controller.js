import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Blogs } from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createBlog = asyncHandler(async (req, res) => {
  const { title, content, writer, date, visiblity } = req.body;
  if (!title && !content && !writer && !date && !visiblity) {
    throw new ApiError(400, "Fill the required fields!!!");
  }

  const localFilePath = req.files?.image[0]?.path;

  if (!localFilePath) {
    throw new ApiError(400, "Image is required!!!");
  }

  const image = await uploadOnCloudinary(localFilePath);
  if (!image) {
    throw new ApiError(
      500,
      "Something went wrong while uploading the image!!!"
    );
  }

  const blog = await Blogs.create({
    title,
    image: image.url,
    content,
    writer,
    date,
    visiblity,
  });

  if (!blog) {
    throw new ApiError(500, "Something went wrong while creating the blog!!!");
  }

  res.status(200).json(new ApiResponse(200, blog, "Blog created!!!"));
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const allBlogs = await Blogs.find();
  if (!allBlogs) {
    throw new ApiError(500, "Somethign went wrong while fetching the blogs!!!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Blogs fetched successfully!!!", allBlogs));
});

const updateBlog = asyncHandler(async (req, res) => {
  const existingBlog = await Blogs.findOne({ _id: req.params.id });
  if (!existingBlog) {
    throw new ApiError(400, "No blog found!!!");
  }

  const { title, content, writer, date, visiblity } = req.body;
  if (!title && !content && !writer && !date && !visiblity) {
    throw new ApiError(400, "All fields are empty");
  }

  const updatedBlog = await Blogs.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedBlog) {
    throw new ApiError(500, "Something went wrong while updating the blog!!!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedBlog, "Blog updated successfully"));
});

const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blogs.findOne({ _id: req.params.id });
  if (!blog) {
    throw new ApiError(400, "No blog found!!!");
  }

  res.status(200).json(new ApiResponse(200, blog, "Blog found!!!"));
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blogs.findOne({ _id: req.params.id });
  if (!blog) {
    throw new ApiError(400, "No blog found!!!");
  }

  const deletedBlog = await Blogs.findByIdAndDelete(blog._id);
  if (!deletedBlog) {
    throw new ApiError(500, "Something went wrong while deleting the blog!!!");
  }

  res.status(200).json(new ApiResponse(200, "Blog deleted successfully!!!"));
});

const updateImage = asyncHandler(async (req, res) => {
  const existingBlog = await Blogs.findOne({ _id: id });
  if (!existingBlog) {
    throw new ApiError(400, "Blog already exists!!!");
  }

  const imageLocalPath = req.files?.image[0]?.url;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(
      500,
      "Something went wrong while uploading the image!!!"
    );
  }

  const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id, {
    $set: { image: image.url },
  });
  if (!updatedBlog) {
    throw new ApiError(500, "Something went wrong while updating the blog");
  }

  res.status(200).json(new ApiResponse(200, "Image updated", updatedBlog));
});

export {
  createBlog,
  getAllBlogs,
  updateBlog,
  getBlogById,
  deleteBlog,
  updateImage,
};

import { Collections } from "../models/collection.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createCollection = asyncHandler(async (req, res) => {
  const { title, type, description } = req.body;

  if (!title || !type || !description) {
    throw new ApiError(400, "Fill the required fields!!!");
  }

  const imageLocalPath = req.files?.image[0]?.path;

  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required!!!");
  }

  const imageOnCloudinary = await uploadOnCloudinary(imageLocalPath);

  if (!imageOnCloudinary) {
    throw new ApiError(
      500,
      "Something went wrong while uploading the image on cloudinary server!!!"
    );
  }

  const collection = await Collections.create({
    title,
    type,
    description,
    image: imageOnCloudinary.url,
  });

  if (!collection) {
    throw new ApiError(
      500,
      "Somthing went wrong while creating the collection!!!"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Collection created successfully!!!", collection)
    );
});

const getAllCollections = asyncHandler(async (req, res) => {
  const allCollections = await Collections.find();
  if (!allCollections) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the collections!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Collections sent", allCollections));
});

const updateCollection = asyncHandler(async (req, res) => {
  const existingCollection = await Collections.findOne({ _id: req.params.id });
  if (!existingCollection) {
    throw new ApiError(400, "No such collection found!!!");
  }

  const { type, title, description } = req.body;
  if (!type && !title && !description) {
    throw new ApiError(400, "All fields are empty");
  }

  const updatedCollection = await Collections.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedCollection) {
    throw new ApiError(
      500,
      "SOmething went wrong while updating the collection!!!"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Collection updated Successfully!!!",
        updatedCollection
      )
    );
});

const getByTitle = asyncHandler(async (req, res) => {
  if (!req.query.title) {
    throw new ApiError(400, "No title query found!!!");
  }
  const collection = await Collections.findOne({ title: req.query.title });

  if (!collection) {
    throw new ApiError(400, "No collection found!!!");
  }

  res.status(200).json(new ApiResponse(200, "Collection found", collection));
});

const deleteCollection = asyncHandler(async (req, res) => {
  const existingCollection = await Collections.findOne({ _id: req.params.id });
  if (!existingCollection) {
    throw new ApiError(400, "No collection found!!!");
  }

  const deletedCollection = await Collections.findByIdAndDelete(req.params.id);
  if (!deletedCollection) {
    throw new ApiError(
      400,
      "Something went rowng while deleting the collectiono!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Collection deleted successfully!!!"));
});

const updateImage = asyncHandler(async (req, res) => {
  const existingCollection = await Collections.findOne({ _id: req.params.id });
  if (!existingCollection) {
    throw new ApiError(400, "No collection found!!!");
  }

  const localFilePath = req.files?.image[0]?.path;
  if (!localFilePath) {
    throw new ApiError(400, "Upload teh image!!!");
  }

  const imagePath = await uploadOnCloudinary(localFilePath);
  if (!imagePath) {
    throw new ApiError(500, "Failed to upload image on the server!!!");
  }

  const updatedCollection = await Collections.findByIdAndUpdate(
    req.params.id,
    { $set: { image: imagePath.url } },
    { new: true }
  );

  if (!updatedCollection) {
    throw new ApiError(500, "Failed to update the image!!!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Image updated!!!", updatedCollection));
});

const getById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new ApiError(400, "Id is required!!!");
  }

  const collection = await Collections.findOne({ _id: id });
  if (!collection) {
    throw new ApiError(400, "Collection not found!!!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Collection fetched!!!", collection));
});

export {
  createCollection,
  getAllCollections,
  updateCollection,
  deleteCollection,
  updateImage,
  getByTitle,
  getById,
};

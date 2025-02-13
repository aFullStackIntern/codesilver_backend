import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Products } from "../models/product.model.js";
import { Varients } from "../models/varient.model.js";
import { Collections } from "../models/collection.model.js";
import { Discounts } from "../models/discount.model.js";
import { Reviews } from "../models/review.model.js";
import { AmountOffPdtCode } from "../models/amountOffProductsCode.js";
import { AmountOffPdtAuto } from "../models/amountOffProductsAuto.js";
import moment from "moment";
import mongoose from "mongoose";

const createProduct = asyncHandler(async (req, res) => {
  const {
    weight,
    name,
    price,
    status,
    isDraft,
    description,
    varients,
    tags,
    collectionId,
    discountId,
  } = req.body;

  console.log(req.body);

  if (
    !name ||
    !weight ||
    !price ||
    !description ||
    !collectionId ||
    !varients
  ) {
    throw new ApiError(400, "Requried fields are missing!");
  }

  const existingProduct = await Products.findOne({ name });
  if (existingProduct) {
    throw new ApiError(400, "Product already exists!!!");
  }

  const imageLocalPath = req.files?.image[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(
      500,
      "Something went wrong while uploading the image on server!!!"
    );
  }

  const medias = [];

  if (!req.files.medias) {
    throw new ApiError(400, "Medias are required!!!");
  }

  for (let i = 0; i < req.files.medias.length; i++) {
    const medium = await uploadOnCloudinary(req.files.medias[i].path);

    if (!medium) {
      throw new ApiError(
        500,
        "Something went wrong while uploading teh image on the server!!!"
      );
    }
    medias.push(medium.url);
  }

  const product = await Products.create({
    image: image.url,
    weight,
    name,
    price,
    status,
    reviews: 0,
    isDraft,
    description,
    medias,
    varients,
    collectionId,
    discountId,
  });

  if (!product) {
    throw new ApiError(
      500,
      "Something went wrong while creating the product!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Product created!!!", product));
});

const updateReviews = asyncHandler(async (req, res) => {
  const product = await Products.findOne({ _id: req.params.id });
  if (!product) {
    throw new ApiError(400, "No product found!!!");
  }

  const review = setReviews(req.params.id);

  const updatedProduct = await Products.findByIdAndUpdate(
    req.params.id,
    { $set: { reviews: review } },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(
      500,
      "Something went wrong while updating the product!!!"
    );
  }
});

const updateImage = asyncHandler(async (req, res) => {
  const product = await Products.findOne({ _id: req.params.id });
  if (!product) {
    throw new ApiError(400, "No product found!!!");
  }

  const imageLocalPath = req.files?.image[0].path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "Something went wrong while updating the image!!!");
  }

  const updatedProduct = await Products.findByIdAndUpdate(
    req.params.id,
    { image: image.url },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(500, "Something went wrong while updating the image!!!");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Image updated successfully!!!", updatedProduct)
    );
});

const updateMedium = asyncHandler(async (req, res) => {
  const product = await Products.findOne({ _id: req.params.id });
  if (!product) {
    throw new ApiError(400, "No product found!!!");
  }

  const { position } = req.body;
  if (!position) {
    throw new ApiError(400, "Position is required!!!");
  }

  const mediumLocalPath = req.files?.medium[0].path;
  if (!mediumLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const medium = await uploadOnCloudinary(mediumLocalPath);
  if (!medium) {
    throw new ApiError(
      500,
      "Something went wrong while updating the medium!!!"
    );
  }

  const medias = product.medias;
  medias[position] = medium.url;

  const updatedProduct = await Products.findByIdAndUpdate(
    req.params.id,
    { medias },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(500, "Something went wrong while updating the image!!!");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Medium updated successfully!!!", updatedProduct)
    );
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Products.findOne({ _id: req.params.id });
  if (!product) {
    throw new ApiError(400, "No product found!!!");
  }

  const { name, status, description, tags, collectionId, discountId } =
    req.body;
  if (
    !name &&
    !status &&
    !description &&
    !tags &&
    !collectionId &&
    !discountId
  ) {
    throw new ApiError(500, "All fields are empty!!!");
  }

  const updatedProduct = await Products.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedProduct) {
    throw new ApiError(
      500,
      "Something went wrong while updating the product!!!"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Product updated!!!", updatedProduct));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Products.find();
  if (!products) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the products!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Products fetched successfully!!!", products));
});

const getProductsByCollectionName = asyncHandler(async (req, res) => {
  const { collectionName } = req.query;
  if (!collectionName) {
    throw new ApiError(400, "Collection name is required!!!");
  }

  const collection = await Collections.findOne({ title: collectionName });
  if (!collection) {
    throw new ApiError(400, "Collection not found!!!");
  }

  const products = await Products.find({ collectionId: collection._id });
  if (!products) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the products!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Products fetched successfully!!!", products));
});

const getProductsByCollectionId = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!id) {
    throw new ApiError(400, "collection id is required!!!");
  }
  const collection = await Collections.findOne({ _id: id });
  if (!collection) {
    throw new ApiError(400, "Collection not found!!!");
  }

  const products = await Products.find({ collectionId: collection._id });
  if (!products) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the products!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Products fetched successfully!!!", products));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Id is required!!!");
  }

  const product = await Products.findOne({ _id: id });
  if (!product) {
    throw new ApiError(400, "No product found!!!");
  }

  const deletedProduct = await Products.findByIdAndDelete(product._id);
  if (!deletedProduct) {
    throw new ApiError(500, "Something went wrong while deleting the product");
  }

  res.status(200).json(new ApiResponse(200, "Product deleted successfully!!!"));
});

const saveDraft = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Products.findOne({ _id: id });
  if (!product) {
    throw new ApiError(400, "Product not found");
  }

  const updatedProduct = await Products.findByIdAndUpdate(
    id,
    { $set: { isDraft: false } },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(
      500,
      "Something went wrong while updating the product!!!"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Product updated successfully!!!", updatedProduct)
    );
});

const addDiscount = asyncHandler(async (req, res) => {
  const { discountId, productId } = req.body;
  if (!productId) {
    throw new ApiError(400, "Product id is required!!!");
  }

  if (!discountId) {
    throw new ApiError(400, "Discount id is required!!!");
  }

  const product = await Products.findOne({ _id: productId });
  if (!product) {
    throw new ApiError(400, "No product found!!!");
  }

  const discount = await Discounts.findOne({ _id: discountId });
  if (!discount) {
    throw new ApiError(400, "No discount found!!!");
  }

  const typeId = new mongoose.Types.ObjectId(discount.typeId);

  let discountedPrice = 0;
  let price = product.price;
  const now = moment().format("YYYY-MM-DD");

  if (discount.method.toLowerCase() === "code") {
    const productDiscount = await AmountOffPdtCode.findOne({
      _id: typeId,
    });

    if (!productDiscount) {
      throw new ApiError(
        500,
        "Something went wrong while fetching the product discount!!!"
      );
    }
    const start = moment(productDiscount.startTime).format("YYYY-MM-DD");
    const end = moment(productDiscount.endTime).format("YYYY-MM-DD");

    if (now < end && now > start) {
      if (productDiscount.uses > 0) {
        if (productDiscount.discountValueType === "Percent") {
          discountedPrice =
            price - price * 0.01 * productDiscount.discountValue;
        } else if (productDiscount.discountValueType === "Amount") {
          discountedPrice = price - productDiscount.discountValue;
        }
      }
    } else {
      throw new ApiError(400, "Discount not available right now!!!");
    }
  } else {
    const productDiscount = await AmountOffPdtAuto.findOne({
      _id: typeId,
    });
    if (!productDiscount) {
      throw new ApiError(
        500,
        "Something went wrong while fetching the product discount!!!"
      );
    }
    const start = moment(productDiscount.startTime, "YYYY-MM-DD");
    const end = moment(productDiscount.endTime, "YYYY-MM-DD");

    if (now < end && now > start) {
      if (productDiscount.discountValueType === "Percent") {
        discountedPrice = price - price * 0.01 * productDiscount.discountValue;
      } else if (productDiscount.discountValueType === "Amount") {
        discountedPrice = price - productDiscount.discountValue;
      }
    }
  }

  const updatedProduct = await Products.findByIdAndUpdate(
    productId,
    {
      $set: { discountedPrice },
    },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(
      500,
      "Something went wrong while updating the product!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Discount added!!!", updatedProduct));
});

const removeDiscount = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    throw new ApiError(400, "Product Id is required!!!");
  }

  const product = await Products.findOne({ _id: productId });
  if (!product) {
    throw new ApiError(400, "Product not found!!!");
  }

  const updatedProduct = await Products.findByIdAndUpdate(
    product._id,
    { $set: { discountedPrice: null } },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(
      400,
      "Something went wrong while updating the product!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Product updated!!!", updatedProduct));
});

const removePhotoFrame = asyncHandler(async (req, res) => {
  const productId = req.query.id;

  if (!productId) {
    throw new ApiError(200, "Product id is required!!!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Photo frame removed successfullly!!!"));
});

export {
  saveDraft,
  createProduct,
  updateReviews,
  updateImage,
  updateMedium,
  updateProduct,
  getAllProducts,
  getProductsByCollectionName,
  getProductsByCollectionId,
  deleteProduct,
  addDiscount,
  removeDiscount,
};

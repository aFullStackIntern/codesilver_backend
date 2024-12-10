import { Zones } from "../models/shippingZone.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createShipping = asyncHandler(async (req, res) => {
  const { countryCodes, countries, rates } = req.body;
  if (!countryCodes || !countries || !rates) {
    throw new ApiError(400, "Fill all the required fields!!!");
  }

  const shipping = await Zones.create(req.body);
  if (!shipping) {
    throw new ApiError(
      500,
      "Something went wrong while creating the shipping zone!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Shipping zone created!!!", shipping));
});

const getAllShipping = asyncHandler(async (req, res) => {
  const allShippings = await Zones.find();
  if (!allShippings) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the shippings!!!"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Shippings fetched successfully!!!", allShippings)
    );
});

const updateShipping = asyncHandler(async (req, res) => {
  const shipping = await Zones.findOne({ _id: req.params.id });
  if (!shipping) {
    throw new ApiError(400, "Shipping zone not found!!!");
  }

  const { countryCodes, countries, rates } = req.body;
  if (!countryCodes && !countries && !rates) {
    throw new ApiError(400, "Please fill the required fields!!!");
  }

  const updatedShipping = await Zones.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!updatedShipping) {
    throw new ApiError(
      500,
      "Something went wrong while updating the shipping!!!"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Shipping updated successfully!!!", updatedShipping)
    );
});

const getShippingById = asyncHandler(async (req, res) => {
  const shipping = await Zones.findOne({ _id: req.params.id });
  if (!shipping) {
    throw new ApiError(400, "Shipping zone not found!!!");
  }

  res.status(200).json(new ApiResponse(200, "Shipping zone sent!!!", shipping));
});

const deleteShipping = asyncHandler(async (req, res) => {
  const shipping = await Zones.findOne({ _id: req.params.id });
  if (!shipping) {
    throw new ApiError(400, "Shipping zone not found!!!");
  }

  const deletedShipping = await Zones.findByIdAndDelete(req.params.id);
  if (!deletedShipping) {
    throw new ApiError(
      500,
      "Something went wrong while updating the shipping!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Shipping zone deleted!!!"));
});

export {
  createShipping,
  getAllShipping,
  updateShipping,
  getShippingById,
  deleteShipping,
};

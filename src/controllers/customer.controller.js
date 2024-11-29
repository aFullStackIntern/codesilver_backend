import { Customers } from "../models/customer.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createCustomer = asyncHandler(async (req, res) => {
  const {
    name,
    subscribed,
    address,
    totalOrders,
    contact,
    email,
    totalAmount,
    countryCode,
  } = req.body;

  if (!name || !address || !contact || !email || !countryCode) {
    throw new ApiError(400, "Please fill all the required fields!!!");
  }

  const existingCustomer = await Customers.findOne({ email });
  if (existingCustomer) {
    throw new ApiError(400, "Customer already exists!!!");
  }

  const customer = await Customers.create({
    name,
    address,
    subscribed: subscribed || false,
    contact,
    email,
    countryCode,
    totalOrders: totalOrders || [],
    totalAmount: totalAmount || 0,
  });

  if (!customer) {
    throw new ApiError(
      500,
      "SOmething went wrong while creating the customer!!!"
    );
  }

  res.status(200).json(200, "Customer created successfully!!!", customer);
});

export { createCustomer };

import { Customers } from "../models/customer.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const generateAccessAndRefreshTokens = async (customerId) => {
  try {
    const customer = await Customers.findById(customerId);
    const accessToken = customer.generateAccessToken();
    const refreshToken = customer.generateRefreshToken();

    customer.refreshToken = refreshToken;
    await customer.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while creating refresh and access tokens"
    );
  }
};

const createCustomer = asyncHandler(async (req, res) => {
  const {
    name,
    subscribed,
    address,
    totalOrders,
    contact,
    password,
    email,
    totalAmount,
    countryCode,
  } = req.body;

  if (!name || !password || !address || !contact || !email || !countryCode) {
    throw new ApiError(400, "Please fill all the required fields!!!");
  }

  const existingCustomer = await Customers.findOne({ email });
  if (existingCustomer) {
    throw new ApiError(400, "Customer already exists!!!");
  }

  const customer = await Customers.create({
    name,
    address,
    password,
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

  res
    .status(200)
    .json(new ApiResponse(200, "Customer created successfully!!!", customer));
});

const getAllCustomers = asyncHandler(async (req, res) => {
  const allCustomers = await Customers.find();
  if (!allCustomers) {
    throw new ApiError(500, "Failed to fetch all customers!!!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Customers fetched successfully", allCustomers));
});

const updateCustomer = asyncHandler(async (req, res) => {
  const customerExists = await Customers.findOne({ _id: req.params.id });

  if (!customerExists) {
    throw new ApiError(400, "No customer found!!!");
  }

  const { name, subscribed, address, contact, countryCode, email } = req.body;

  if (!name && !subscribed && !address && !contact && !countryCode && !email) {
    throw new ApiError(400, "All fields are empty");
  }

  const updatedCustomer = await Customers.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updatedCustomer) {
    throw new ApiError(500, "Something went wrong while updating the customer");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Customer updated", updatedCustomer));
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const customerExists = await Customers.findOne({ _id: req.params.id });

  if (!customerExists) {
    throw new ApiError(400, "No customer found!!!");
  }

  const deletedCustomer = await Customers.findByIdAndDelete(req.params.id);
  if (!deletedCustomer) {
    throw new ApiError(
      500,
      "Somthing went wrong while deleting the customer!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Customer deleted successfully!!!"));
});

const updatePassword = asyncHandler(async (req, res) => {
  const customerExists = await Customers.findOne(req.params.id);

  if (!customerExists) {
    throw new ApiError(400, "No customer exists!!!");
  }

  res.status(200).json(200, "Password updated");
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Please fill all the required fields!!!");
  }

  const customer = await Customers.findOne({ email });
  if (!customer) {
    throw new ApiError(400, "No customer found!!!");
  }

  const isValid = await customer.isPasswordCorrect(password);

  if (!isValid) {
    throw new ApiError(400, "Please enter the correct password!!!");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    customer._id
  );

  const loggedInCustomer = await Customers.findById(customer._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, "Customer logged in", loggedInCustomer));
});

const logoutCustomer = asyncHandler(async (req, res) => {
  Customers.findByIdAndUpdate(
    req.customer._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "Customer logged out"));
});

export {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  login,
  logoutCustomer,
};

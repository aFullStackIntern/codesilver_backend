import { Customers } from "../models/customer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyCustomer = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      throw new ApiError(401, "Unauthorized admin access!!!");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const customer = await Customers.findById(decodedToken._id).select(
      "-refreshToken"
    );

    if (!customer) {
      throw new ApiError(401, "Invalid access token!!!!");
    }
    req.customer = customer;
    next();
  } catch (error) {
    throw new ApiError(501, "Invalid access token!!!");
  }
});

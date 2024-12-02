import { Customers } from "../models/customer.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

import { Parser } from "json2csv";
import csv from "csv-parser";
import fs from "fs";

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

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const customer = await Customers.findById(req.customer._id);
  const isPasswordCorrect = await customer.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  customer.password = newPassword;
  await customer.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Passwrod changed successfully!!!"));
});

const exportCustomers = asyncHandler(async (req, res) => {
  const customers = await Customers.find();

  if (!customers) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the customers!!!"
    );
  }

  const fields = [
    "_id",
    "name",
    "password",
    "subscribed",
    "address",
    "totalOrders",
    "contact",
    "countryCode",
    "email",
    "totalAmount",
  ];

  const csvParser = new Parser({ fields });
  const csv = csvParser.parse(customers);

  // fs.writeFile("public/temp/customers.csv", csv, (err) => {
  //   if (err) {
  //     throw new ApiError(500, err);
  //   }
  // });

  if (!csv) {
    throw new ApiError(500, "Error creating csv!!!");
  }

  res.header("Content-Type", "text/csv");
  res.attachment("customers.csv");
  res.status(200).send(csv);
});

const importCustomers = asyncHandler(async (req, res) => {
  const csvLocalPath = req.files?.csv[0]?.path;
  // console.log(req.files);
  if (!csvLocalPath) {
    throw new ApiError(400, "Upload the file");
  }

  const requiredFields = [
    "name",
    "password",
    "email",
    "contact",
    "address",
    "countryCode",
  ];
  const booleanFields = ["subscribed"];
  const numberFields = ["totalAmount"];
  const arrayFields = ["totalOrders"];

  const errors = [];
  const results = [];

  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(csvLocalPath)
        .pipe(csv())
        .on("data", (row) => {
          const missingFields = requiredFields.filter((field) => !row[field]);

          if (missingFields.length > 0) {
            errors.push({
              row,
              error: `Missing fields: ${missingFields.join(", ")}`,
            });
            return;
          }

          // Type conversion
          booleanFields.forEach((field) => {
            if (row[field] !== undefined) {
              row[field] = row[field].toLowerCase() === "true";
            }
          });

          numberFields.forEach((field) => {
            if (row[field] !== undefined) {
              const parsedValue = parseFloat(row[field]);
              row[field] = isNaN(parsedValue) ? null : parsedValue;
            }
          });

          arrayFields.forEach((field) => {
            if (row[field] !== undefined && row[field] !== "") {
              row[field] = row[field]
                .split(",")
                .map((item) => parseFloat(item.trim()))
                .filter((item) => !isNaN(item));
            }
          });

          results.push(row);
        })
        .on("end", resolve)
        .on("error", reject);
    });

    const savedEntries = [];
    for (const entry of results) {
      const customer = await Customers.create(entry);
      savedEntries.push(customer);
    }

    fs.unlinkSync(csvLocalPath);
    if (errors) {
      res.status(400).json({
        message: "Some required fields are missing",
        errors, // Include errors in the response if needed
      });
      res.status(200).json({
        message: "Customers imported successfully",
      });
    }
  } catch (error) {
    fs.unlinkSync(csvLocalPath); // Clean up uploaded file
    return res.status(500).json({ message: "Error processing CSV", error });
  }
});

export {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  login,
  logoutCustomer,
  changePassword,
  exportCustomers,
  importCustomers,
};

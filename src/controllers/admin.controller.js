import { Admin } from "../models/admin.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refershToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while creating refresh and access tokens"
    );
  }
};

const createAdmin = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    throw new ApiError(400, "Please fill all the required fields!!!");
  }

  const existing = await Admin.find({
    $or: [{ username }, { email }],
  });

  if (existing.length > 0) {
    throw new ApiError(400, "Admin already exists!!!");
  }

  const admin = await Admin.create(req.body);

  if (!admin) {
    throw new ApiError(
      500,
      "Something went wrong while creatingt the admin!!!"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Admin created successfully!!!", admin));
});

const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find();
  if (!admins) {
    throw new ApiError(500, "Something went wrong while fetching the admins");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Admins fetched successfully", admins));
});

const deleteAdmin = asyncHandler(async (req, res) => {
  const adminExists = await Admin.findById(req.params.id);
  if (!adminExists) {
    throw new ApiError(400, "No admin found!!!");
  }

  const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
  if (!deletedAdmin) {
    throw new ApiError(500, "Something went wrong while deleting the admin!!!");
  }

  res.status(200).json(new ApiResponse(200, "Admin deleted successfully!!!"));
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(400, "Please fill all the required fields!!!");
  }

  const admin = await Admin.findOne({ username });
  if (!admin) {
    throw new ApiError(400, "No admin found!!!");
  }

  const isValid = await admin.isPasswordCorrect(password);

  if (!isValid) {
    throw new ApiError(400, "Please enter the correct password!!!");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    admin._id
  );

  const loggedInAdmin = await Admin.findById(admin._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { admin: loggedInAdmin, accessToken, refreshToken },
        "Admin logged in!!!"
      )
    );
});

const updateAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) {
    throw new ApiError(400, "Admin not found");
  }

  const { email, username } = req.body;
  if (!email && !username) {
    throw new ApiError(400, "All the fields are empty!!!");
  }

  const updatedAdmin = await Admin.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  if (!updateAdmin) {
    throw new ApiError(500, "SOmething went wrong while updating admin!!!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Admin updated successfully!!!", updatedAdmin));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.admin?._id);
  const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  admin.password = newPassword;
  await admin.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfullly"));
});

const logoutAdmin = asyncHandler(async (req, res) => {
  Admin.findByIdAndUpdate(
    req.admin._id,
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
    .json(new ApiResponse(200, "User logged out"));
});

export {
  createAdmin,
  getAllAdmins,
  deleteAdmin,
  login,
  updateAdmin,
  changePassword,
  logoutAdmin,
};

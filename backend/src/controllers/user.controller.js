import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary_upload.js";
import { deleteFromCloudinary } from "../utils/Cloudinary_remove.js";
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found for token generation");
    }
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(
      500,
      err.message || "something went wrong while generating tokens"
    );
  }
};
const registerUser = asyncHandler(async (req, res, _) => {
  const { name, username, email, password, role } = req.body;
  if (
    [name, username, email, password, role].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const userExist = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (userExist) {
    throw new ApiError(400, "User already exist");
  }
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const user = await User.create({
    name,
    username,
    email,
    password,
    role,
    avatar: avatar.url,
  });
  if (!user) {
    throw new ApiError(500, "Something went wrong while Registring user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User registered successfully"));
});
const loginUser = asyncHandler(async (req, res, _) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found incorrect Email");
  }
  const correctPassword = await user.isPasswordCorrect(password);
  if (!correctPassword) {
    throw new ApiError(400, "Invalid credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!loggedInUser) {
    throw new ApiError(500, "something went wrong while loggin user");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});
const logoutUser = asyncHandler(async (req, res, _) => {
  const userId = req.user._id;
  await User.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: 1,
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
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
const deleteUser = asyncHandler(async (req, res, _) => {
  const userId = req.user._id;
  const avatar = req.user.avatar;
  try {
    await User.findByIdAndDelete(userId);
    await deleteFromCloudinary(avatar);
  } catch (err) {
    throw new ApiError(500, "Failed to delete the user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted Successfully"));
});
const getCurrentUser = asyncHandler(async (req, res, _) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "User not authenticated");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "Current user fetched successfully"));
});
const getAllUser = asyncHandler(async (req, res, _) => {
  const users = await User.find().select("-password -refreshToken");
  if(users.length === 0){
    throw new ApiError(404, "No users found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { users }, "All users fetched successfully"));
});
export { registerUser, loginUser, logoutUser, deleteUser, getCurrentUser, getAllUser };
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary_upload.js";
const registerUser = asyncHandler(async (req, res) => {
 
  const { name, email, password, role } = req.body;
  if ([name, email, password, role].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const userExist = await User.findOne({
    $and: [{ email }, { role }],
  });
  if (userExist) {
    throw new ApiError(400, "User with email is already exist");
  }
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const user = await User.create({
    name,
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
export { registerUser };

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenvx from "@dotenvx/dotenvx";
dotenvx.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (fileLocalPath) => {
  if (!fileLocalPath) return null;
  try {
    const response = await cloudinary.uploader.upload(fileLocalPath, {
      resource_type: "auto",
    });
    fs.unlinkSync(fileLocalPath);
    return response;
  } catch (err) {
    fs.unlinkSync(fileLocalPath);
    return null;
  }
};

export { uploadOnCloudinary };

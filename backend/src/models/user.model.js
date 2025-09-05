import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenvx from "@dotenvx/dotenvx";
dotenvx.config();
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["admin", "member"],
        message: "Role should be an admin or member",
      },
    },
    avatar: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: " ",
    },
  },
  {
    timestamp: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next;
});
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateRefreshToken = function () {
  return Jwt.sign(
    {
      //Paylaod use wanted to embedded in token
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateAccessToken = function () {
  return Jwt.sign(
    {
      //Paylaod use wanted to embedded in token
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
export const User = model("User", userSchema);

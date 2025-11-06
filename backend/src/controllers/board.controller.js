import mongoose from "mongoose";
import { Board } from "../models/board.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createBoard = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { title, description, userIds } = req.body; // userIds is expected as an array of all selected user Id's
  if ([title, description].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  if (userIds.length === 0) {
    throw new ApiError(400, "At least one user is required");
  }
  const members = userIds.map((u_id) => new mongoose.Types.ObjectId(u_id));
  const board = await Board.create({
    title,
    description,
    createdBy: new mongoose.Types.ObjectId(user._id),
    members,
  });
  if (!board) {
    throw new ApiError(500, "Something went wrong while creating board");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, board, "Board created successfully"));
});
export { createBoard };

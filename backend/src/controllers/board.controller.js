import mongoose from "mongoose";
import { Board } from "../models/board.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const ValidateId = (ID) => {
  if (!ID || ID?.length != 24) {
    throw new ApiError(400, "Invalid Id's");
  }
};
const createBoard = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { title, description, userIds } = req.body; // userIds is expected as an array of all selected user Id's
  // validate inputs
  if ([title, description].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  if (userIds.length === 0) {
    throw new ApiError(400, "At least one user is required");
  }
  // find if there is any duplicated title board
  const existingBoard = await Board.findOne({ title });

  if (existingBoard) {
    throw new ApiError(400, "A board with this title already exists");
  }

  // convert string Ids to mongoDb object Ids
  const members = userIds.map((u_id) => {
    ValidateId(u_id);
    return new mongoose.Types.ObjectId(u_id);
  });
  // create board
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
const getAllBoard = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const boards = await Board.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "members",
        foreignField: "_id",
        as: "members",
        pipeline: [
          {
            $project: {
              username: 1,
              role: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        title: 1,
        description: 1,
        members: 1,
      },
    },
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(500, { boards }, "All boards are fetched successfully")
    );
});
const deleteBoard = asyncHandler(async (req, res, next) => {
  const { boardId } = req.params;
  ValidateId(boardId);
  try {
    await Board.findByIdAndDelete(boardId);
  } catch (err) {
    throw new ApiError(500, err.message || "Failed to delete board");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Board deleted successfully"));
});
const updateBoardDetails = asyncHandler(async (req, res, next) => {
  const { boardId } = req.params;
  const { title, description } = req.body;
  // validate inputs
  ValidateId(boardId);
  if ([title, description].some((field) => field.trim() === "")) {
    throw new ApiError(400, "Details are missing");
  }
  const updatedBoard = await Board.findByIdAndUpdate(
    boardId,
    {
      title: title,
      description: description,
    },
    {
      new: true,
    }
  );
  if (!updatedBoard) {
    throw new ApiError(500, "Failed in updating boards details");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedBoard, "board's details updated successfully")
    );
});
const updateBoardMembers = asyncHandler(async (req, res, next) => {
  // get board Id from params
  const { boardId } = req.params;
  // get new user ids
  const { userIds } = req.body;
  // validate and convert ids into object ids
  ValidateId(boardId);
  if (!userIds || userIds?.length === 0) {
    throw new ApiError(400, "Board must contain at least one member");
  }
  let newMembers = userIds.map((u_id) => {
    ValidateId(u_id);
    return new mongoose.Types.ObjectId(u_id);
  });
  // update and return the new document
  const updatedBoardMembers = await Board.findByIdAndUpdate(
    boardId,
    {
      members: newMembers,
    },
    {
      new: true,
    }
  );
  if (!updatedBoardMembers) {
    throw new ApiError(500, "Failed to update board members");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedBoardMembers,
        "Successfully updated board members"
      )
    );
});
export {
  createBoard,
  deleteBoard,
  getAllBoard,
  updateBoardDetails,
  updateBoardMembers,
};

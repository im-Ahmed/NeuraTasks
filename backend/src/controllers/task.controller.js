import mongoose from "mongoose";
import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const ValidateId = (ID) => {
  if (!ID || ID?.length != 24) {
    throw new ApiError(400, "Invalid Id's");
  }
};
const createTask = asyncHandler(async (req, res) => {
  const { title, description, boardId, userIds, priority, status, dueDate } =
    req.body;
  // validate inputs
  if (
    [title, description, priority, status, dueDate].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  if (userIds?.length === 0) {
    throw new ApiError(400, "At least one user is required");
  }
  ValidateId(boardId);
  // validate each id and also mapped into ObjectId
  const members = userIds.map((u_id) => {
    ValidateId(u_id);
    return new mongoose.Types.ObjectId(u_id);
  });
  // check for task duplication
  const isTask = await Task.findOne({
    title,
  });
  if (isTask) {
    throw new ApiError(401, "Task is already assigned");
  }
  // create task
  const task = await Task.create({
    title,
    description,
    board: new mongoose.Types.ObjectId(boardId),
    dueDate,
    assignedTo: members,
    priority,
    status,
  });

  if (!task) {
    throw new ApiError(500, "Failed or assign task");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { task }, "Task created successfully"));
});


export { createTask };

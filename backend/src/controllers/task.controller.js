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
const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  ValidateId(taskId);
  try {
    await Task.findByIdAndDelete(taskId);
  } catch (err) {
    console.log(err || "Failed to delete task");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "task deleted successfully"));
});
const allTasks = asyncHandler(async (req, res) => {
  const { boardId } = req.params;
  ValidateId(boardId);
  const tasks = await Task.find({
    board: boardId,
  });
  if (!tasks) {
    throw new ApiError(500, "Failed to fetch all tasks");
  }
  res
    .status(200)
    .json(new ApiResponse(200, { tasks }, "Successfully fetched all tasks"));
});
const updateTaskDetails = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { taskId } = req.params;
  const { newPriority, newStatus, newDueDate } = req.body;
  ValidateId(taskId);
  if (
    [newPriority, newStatus, newDueDate].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "all field are required for updation");
  }
  // check whether the user try to update really belongs this task and then update
  const updatedTask = await Task.findOneAndUpdate(
    {
      _id: taskId,
      assignedTo: {
        $in: [userId],
      },
    },
    {
      priority: newPriority,
      status: newStatus,
      dueDate: newDueDate,
    },
    {
      new: true,
    }
  );
  if (!updatedTask) {
    throw new ApiError(
      500,
      "Failed to update might be the user is not autherized to update task"
    );
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, { updatedTask }, "Successfully update task details")
    );
});
const getAllUserTasks = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userTasks = await Task.find({
    assignedTo: {
      $in: [userId],
    },
  });
  if (!userTasks) {
    throw new ApiError(500, "Failed to get user tasks");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, { userTasks }, "User tasks fetched successfully")
    );
});

export { createTask, deleteTask, allTasks, updateTaskDetails, getAllUserTasks };

import { Activity } from "../models/activity.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const ValidateId = (ID) => {
  // Skip validation if the ID is not provided
  if (!ID) return;

  // Validate only when ID exists
  if (typeof ID !== "string" || ID.length !== 24) {
    throw new ApiError(400, "Invalid ID format");
  }
};

const createActivity = asyncHandler(async (req, res) => {
  const { action, board, task, details } = req.body;
  const userId = req.user._id;
  if (!action) {
    throw new ApiError(401, "Action is required");
  }
  const activity = await Activity.create({
    action,
    board,
    task,
    user: userId,
    details,
  });
  if (!activity) {
    throw new ApiError(500, "Failed to track activity");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, { activity }, "Successfully added to activity log")
    );
});
const getActivityLog = asyncHandler(async (req, res) => {
  const activityLog = await Activity.find({});
  if (!activityLog) {
    throw new ApiError(200, "Failed to fetch activiy log");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, { activityLog }, "Activity log fetched successfully")
    );
});
const clearLog = asyncHandler(async (req, res) => {
  try {
    await Activity.deleteMany({});
  } catch (err) {
    throw new ApiError(500, err || "Failed to clear log");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Successfully clear the log"));
});
export { createActivity, getActivityLog, clearLog };

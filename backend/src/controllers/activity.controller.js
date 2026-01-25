import { Activity } from "../models/activity.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ValidateId } from "../utils/ValidateId.js";
import { broadcast } from "../utils/wsBroadCastor.js";

const createActivity = asyncHandler(async (req, res, _) => {
  const { action, board, task, details } = req.body;
  const userId = req.user._id;
  if (!action) {
    throw new ApiError(401, "Action is required");
  }
  ValidateId(board);
  ValidateId(task);
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
  // notify all connected clients about the new activity
  broadcast({ type: "LOG_ADD", activity });
  return res
    .status(200)
    .json(
      new ApiResponse(200, { activity }, "Successfully added to activity log")
    );
});
const getActivityLog = asyncHandler(async (req, res, _) => {
  const activity = await Activity.aggregate([
    {
      $lookup: {
        from: "tasks",
        localField: "task",
        foreignField: "_id",
        as: "task",
        pipeline: [
          {
            $project: {
              title: 1,
              _id: -1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "boards",
        localField: "board",
        foreignField: "_id",
        as: "board",
        pipeline: [
          {
            $project: {
              title: 1,
              _id: -1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              username: 1,
              _id: -1,
            },
          },
        ],
      },
    },
    {
      $project: {
        action: 1,
        details: 1,
        task: { $arrayElemAt: ["$task.title", 0] },
        board: { $arrayElemAt: ["$board.title", 0] },
        user: { $arrayElemAt: ["$user.username", 0] },
      },
    },
  ]);
  if (!activity) {
    throw new ApiError(200, "Failed to fetch activiy log");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, { activity }, "Activity log fetched successfully")
    );
});
const clearLog = asyncHandler(async (req, res) => {
  try {
    await Activity.deleteMany({});
    // notify all connected clients about the cleared log
    broadcast({ type: "LOG_CLEAR" });
  } catch (err) {
    throw new ApiError(500, err || "Failed to clear log");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Successfully clear the log"));
});
export { createActivity, getActivityLog, clearLog };

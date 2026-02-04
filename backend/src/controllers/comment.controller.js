import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Comment } from "../models/comment.model.js";
import { ValidateId } from "../utils/ValidateId.js";
import { broadcast } from "../utils/wsBroadCastor.js";
import mongoose from "mongoose";

const addComment = asyncHandler(async (req, res, _) => {
  const { message, taskId } = req.body;
  const user = req.user;
  // Validate inputs
  if (!message) {
    throw new ApiError(400, "message is missing");
  }
  ValidateId(taskId);
  const comment = await Comment.create({
    task: new mongoose.Types.ObjectId(taskId),
    commentBY: new mongoose.Types.ObjectId(user._id),
    message,
  });
  if (!comment) {
    throw new ApiError(500, "Failed to add comment on task");
  }
  // Notify all user about new comment
  broadcast({ type: "COMMENT_ADDED", comment });
  return res
    .status(200)
    .json(new ApiResponse(200, { comment }, "Comment added successfully"));
});
const deleteComment = asyncHandler(async (req, res, _) => {
  const { commentId } = req.params;
  ValidateId(commentId);
  try {
    await Comment.findByIdAndDelete(commentId);
    // Notify all user about deleted comment
    broadcast({ type: "COMMENT_DELETED", commentId });
  } catch (err) {
    throw new ApiError(500, err.message || "Failed to delete comment");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment is deleted successfully"));
});
const editComment = asyncHandler(async (req, res, _) => {
  const { message } = req.body;
  const { commentId } = req.params;
  // Validate inputs
  if (!message) {
    throw new ApiError(400, "Edit comment is missing");
  }
  ValidateId(commentId);
  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      message,
    },
    {
      new: true,
    }
  );
  if (!comment) {
    throw new ApiError(500, "Failed to edit comment");
  }
  // Notify all user about edited comment
  broadcast({ type: "COMMENT_EDITED", comment });
  return res
    .status(200)
    .json(new ApiResponse(200, { comment }, "Comment is edited successfully"));
});
const allComments = asyncHandler(async (req, res, _) => {
  const { taskId } = req.params;
  ValidateId(taskId);
  const comments = await Comment.aggregate([
    {
      $match: {
        task: new mongoose.Types.ObjectId(taskId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "commentBY",
        foreignField: "_id",
        as: "commentBY",
        pipeline: [
          {
            $project: {
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        commentBY: { $arrayElemAt: ["$commentBY", 0] },
        message: 1,
        task: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { comments },
        "All comments are Fetched Successfully"
      )
    );
});
export { addComment, deleteComment, editComment, allComments };

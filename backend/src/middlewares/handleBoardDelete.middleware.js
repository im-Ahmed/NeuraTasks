import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Task } from "../models/task.model.js";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
const handleTaskOnBoardDelete = asyncHandler(async (req, _, next) => {
  const { boardId } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const tasks = await Task.find({ board: boardId }).session(session);
    const taskIds = tasks.map((t) => t._d);
    await Comment.deleteMany({ task: { $in: taskIds } }).session(session);
    await Task.deleteMany({ board: boardId }).session(session);
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw new ApiError(
      500,
      err.message || "Failed to delete all task belong to board"
    );
  } finally {
    session.endSession();
  }
  next();
});
export { handleTaskOnBoardDelete };

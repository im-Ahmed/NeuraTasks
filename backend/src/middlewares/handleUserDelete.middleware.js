import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Board } from "../models/board.model.js";
import { Task } from "../models/task.model.js";
import { Comment } from "../models/comment.model.js";

const handleBoardOnUserDelete = asyncHandler(async (req, _, next) => {
  const userId = req.user._id;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const boards = await Board.find({ createdBy: userId }).session(session);
    // USER IS ADMIN
    if (boards.length > 0) {
      const boardIds = boards.map((b) => b._id);
      const tasks = await Task.find({ board: { $in: boardIds } }).session(
        session
      );
      const taskIds = tasks.map((t) => t._id);
      await Comment.deleteMany({ task: { $in: taskIds } }).session(session);
      await Task.deleteMany({ board: { $in: boardIds } }).session(session);
      await Board.deleteMany({ createdBy: userId });
    }
    // USER is MEMBER
    await Task.updateMany(
      {
        assignedTo: userId,
      },
      {
        assignedTo: userId,
      }
    ).session(session);
    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw new ApiError(
      500,
      err.message || "Failed to delete boards belong to user"
    );
  } finally {
    session.endSession();
  }
  next();
});
export { handleBoardOnUserDelete };

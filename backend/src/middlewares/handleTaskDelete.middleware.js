import { ApiError } from "../utils/ApiError.js";
import { Comment } from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const handleCommentOnTaskDelete = asyncHandler(async (req, _, next) => {
  const { taskId } = req.params;
  try {
    await Comment.deleteMany({
      task: taskId,
    });
  } catch (err) {
    throw new ApiError(
      500,
      err.message || "Failed to delete all the comments belongs to task"
    );
  }
  next()
});
export { handleCommentOnTaskDelete };

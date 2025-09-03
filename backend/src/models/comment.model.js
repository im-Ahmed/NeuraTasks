import { Schema, model } from "mongoose";

const commentSchema = new Scheme(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
    commentBY: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

export const Comment = model("Comment", commentSchema);

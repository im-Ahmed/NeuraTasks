import { Schema, model } from "mongoose";

const detailSchema = new Schema({
  oldStatus: {
    type: String,
    required: true,
    enum: ["Todo", "In Progress", "Done", "Blocked"],
  },
  newStatus: {
    type: String,
    required: true,
    enum: ["Todo", "In Progress", "Done", "Blocked"],
  },
});
const activitySchema = new Schema(
  {
    action: {
      type: String,
      required: true,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    details: detailSchema,
  },
  {
    timestamp: true,
  }
);

export const Activity = model("Activity", activitySchema);

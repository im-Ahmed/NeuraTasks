import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "Board",
      },
    ],
    priority: {
      type: String,
      required: true,
      enum: ["HIGH", "LOW", "NORMAL"],
    },
    status: {
      type: String,
      required: true,
      enum: ["TODO", "IN-PROGRESS", "DONE", "BLOCKED"],
    },
  },
  {
    timestamp: true,
  }
);

export const Task = model("Task", taskSchema);

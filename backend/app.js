import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { LIMIT } from "./constants.js";
import dotenvx from "@dotenvx/dotenvx";
dotenvx.config();
const app = express();
// handle files like images and video
app.use(express.static("public"));
// JSON values
app.use(
  express.json({
    limit: LIMIT,
  })
);
// cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// extract from URL
app.use(
  express.urlencoded({
    extended: true,
    limit: LIMIT,
  })
);
// handle cookies
app.use(cookieParser());
// Import routers
import userRouter from "./src/routes/user.route.js";
import boardRouter from "./src/routes/board.route.js";
import taskRouter from "./src/routes/task.route.js";
import commentRouter from "./src/routes/comment.route.js";
import activityRouter from "./src/routes/activity.route.js";

// declare routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/boards", boardRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/activities", activityRouter);

export { app };

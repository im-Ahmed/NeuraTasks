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

// declare routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/boards", boardRouter);

export { app };

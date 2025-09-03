import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { LIMIT } from "./constants";
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
  })
);
// handle cookies
app.use(cookieParser());
export { app };

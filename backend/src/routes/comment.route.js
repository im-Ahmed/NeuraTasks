import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addComment,
  allComments,
  deleteComment,
  editComment,
} from "../controllers/comment.controller.js";

const router = Router();
// secure routes
router.use(verifyJWT); // apply middleware to all routes below
router.route("/add").post(addComment);
router.route("/c/:commentId").delete(deleteComment).patch(editComment);
router.route("/t/:taskId").get(allComments);

export default router;

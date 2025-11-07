import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import {
  createBoard,
  deleteBoard,
  getAllBoard,
  updateBoardDetails,
  updateBoardMembers,
} from "../controllers/board.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
// Secure Routes
router.use(verifyJWT, isAdmin); // apply middeleware to all routes below
router.route("/create").post(createBoard);
router.route("/").get(getAllBoard);
router.route("/b/:boardId").delete(deleteBoard).patch(updateBoardDetails);
router.route("/m/:boardId").patch(updateBoardMembers);
export default router;

import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import {
  createBoard,
  deleteBoard,
  getAllBoard,
  updateBoardDetails,
  
} from "../controllers/board.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { handleTaskOnBoardDelete } from "../middlewares/handleBoardDelete.middleware.js";

const router = Router();
// Secure Routes
router.use(verifyJWT, isAdmin); // apply middeleware to all routes below (only admin access)
router.route("/").get(getAllBoard);
router.route("/create").post(createBoard);
router
  .route("/b/:boardId")
  .delete(handleTaskOnBoardDelete, deleteBoard)
  .patch(updateBoardDetails);
export default router;

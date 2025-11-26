import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import {
  allTasks,
  createTask,
  deleteTask,
  getAllUserTasks,
  updateTaskDetails,
} from "../controllers/task.controller.js";

const router = Router();
// Secure routes
router.use(verifyJWT);
router.route("/u/:taskId").patch(updateTaskDetails);
router.route("/").get(getAllUserTasks);

router.use(isAdmin); // apply middeleware to all routes below (only admin access)
router.route("/b/:boardId").get(allTasks);
router.route("/create").post(createTask);
router.route("/d/:taskId").delete(deleteTask);

export default router;

import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import {
  allTasks,
  createTask,
  deleteTask,
  updateTaskDetails,
} from "../controllers/task.controller.js";

const router = Router();
// Secure routes
router.use(verifyJWT); 
router.route("/b/:boardId").get(allTasks);
router.route("/:taskId").patch(updateTaskDetails);

router.use(isAdmin); // apply middeleware to all routes below (only admin access)
router.route("/create").post(createTask);
router.route("/:taskId").delete(deleteTask);

export default router;

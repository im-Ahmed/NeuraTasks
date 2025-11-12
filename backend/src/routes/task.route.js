import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { createTask } from "../controllers/task.controller.js";

const router = Router();
// Secure routes
router.use(verifyJWT, isAdmin); // apply middeleware to all routes below
router.route("/create").post(createTask);

export default router;

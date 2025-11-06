import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { createBoard } from "../controllers/board.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
// Secure Routes
router.use(verifyJWT, isAdmin); // apply middeleware to all routes below
router.route("/create").post(createBoard);
export default router;

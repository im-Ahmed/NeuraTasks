import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { createBoard } from "../controllers/board.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();
// Secure Routes
router.use(verifyJWT, isAdmin); // apply middeleware to all routes below
router.route("/create").post(createBoard);
export default router;

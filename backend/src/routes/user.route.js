import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  deleteUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { handleBoardOnUserDelete } from "../middlewares/handleUserDelete.middleware.js";
const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);
// secure route
router.use(verifyJWT);
router.route("/logout").post(logoutUser);
router.route("/delete").delete(handleBoardOnUserDelete,deleteUser);

export default router;

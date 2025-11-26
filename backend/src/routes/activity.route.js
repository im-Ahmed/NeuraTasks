import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  clearLog,
  createActivity,
  getActivityLog,
} from "../controllers/activity.controller.js";

const router = Router();
// Secure routes
router.use(verifyJWT);

router.route("/create").post(createActivity);
router.route("/").get(getActivityLog);
router.route("/clear").delete(clearLog);

export default router;

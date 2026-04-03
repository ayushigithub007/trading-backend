import { Router } from "express";
import UserController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/admin.middleware";

const router = Router();

// Admin creates user
router.post(
  "/create",
  authMiddleware,
  adminOnly,
  UserController.createUser
);

export default router;

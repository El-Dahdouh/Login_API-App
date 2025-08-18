import express from "express";
import {
  register,
  login,
  refresh,
  logout,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

// Protected route
router.get("/profile", verifyToken, getCurrentUser);

export default router;

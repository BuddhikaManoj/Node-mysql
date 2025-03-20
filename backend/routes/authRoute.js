import express from "express";
import {
  loginController,
  registerController,
  getUserController,
  verifyToken,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/dashboard", verifyToken, getUserController);

export default router;

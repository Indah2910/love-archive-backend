import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { register, login, getMe, updateProfile, changePassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/me", protect, updateProfile);
router.put("/change-password", protect, changePassword);

export default router;
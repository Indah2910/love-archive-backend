import express from "express";
import { getAllProfiles, upsertProfile } from "../controllers/profileController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadProfileImage } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllProfiles);
router.put("/:name", protect, uploadProfileImage.single("photo"), upsertProfile);

export default router;
import express from "express";
import { getAllMemories, createMemory, updateMemory, deleteMemory } from "../controllers/memoryController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadMemoryImage } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllMemories);
router.post("/", protect, uploadMemoryImage.single("photo"), createMemory);
router.put("/:id", protect, uploadMemoryImage.single("photo"), updateMemory);
router.delete("/:id", protect, deleteMemory);

export default router;
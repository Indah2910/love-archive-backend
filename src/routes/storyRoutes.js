import express from "express";
import {
  getAllStories,
  getStoryById,
  createStory,
  updateStory,
  deleteStory,
} from "../controllers/storyController.js";

const router = express.Router();

router.get("/", getAllStories);
router.get("/:id", getStoryById);
router.post("/", createStory);
router.put("/:id", updateStory);
router.delete("/:id", deleteStory);

export default router;
import express from "express";
import { getAllPlaylist, createSong, deleteSong } from "../controllers/playlistController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllPlaylist);
router.post("/", protect, createSong);
router.delete("/:id", protect, deleteSong);

export default router;
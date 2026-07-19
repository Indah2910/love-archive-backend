import express from "express";
import { getAllLoveLetters, createLoveLetter, updateLoveLetter, deleteLoveLetter } from "../controllers/loveLetterController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllLoveLetters);
router.post("/", protect, createLoveLetter);
router.put("/:id", protect, updateLoveLetter);
router.delete("/:id", protect, deleteLoveLetter);

export default router;
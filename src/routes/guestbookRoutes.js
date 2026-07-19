import express from "express";
import { getAllGuestbook, createGuestbookEntry, deleteGuestbookEntry } from "../controllers/guestbookController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllGuestbook);
router.post("/", createGuestbookEntry); // publik — siapa aja boleh nulis pesan
router.delete("/:id", protect, deleteGuestbookEntry); // cuma admin yang boleh hapus/moderasi

export default router;
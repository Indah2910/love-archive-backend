import express from "express";
import { getAllGallery, uploadGalleryPhoto, deleteGalleryPhoto } from "../controllers/galleryController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadGalleryImage } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllGallery);
router.post("/", protect, uploadGalleryImage.single("photo"), uploadGalleryPhoto);
router.delete("/:id", protect, deleteGalleryPhoto);

export default router;
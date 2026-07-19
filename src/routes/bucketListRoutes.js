import express from "express";
import { getAllBucketList, createBucketItem, toggleBucketItem, deleteBucketItem } from "../controllers/bucketListController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllBucketList);
router.post("/", protect, createBucketItem);
router.patch("/:id/toggle", protect, toggleBucketItem); // khusus checklist done/belum
router.delete("/:id", protect, deleteBucketItem);

export default router;
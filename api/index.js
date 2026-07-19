import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import storyRoutes from "./routes/storyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";
import guestbookRoutes from "./routes/guestbookRoutes.js";
import loveLetterRoutes from "./routes/loveLetterRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import bucketListRoutes from "./routes/bucketListRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.use("/uploads", express.static("src/uploads"));

app.use("/api/story", storyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/memories", memoryRoutes);
app.use("/api/guestbook", guestbookRoutes);
app.use("/api/love-letters", loveLetterRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/bucketlist", bucketListRoutes);
app.use("/api/profiles", profileRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Love Archive API jalan 💙" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Terjadi kesalahan di server" });
});

export default app;
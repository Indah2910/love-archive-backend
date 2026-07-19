import prisma from "../config/prisma.js";
import { cloudinary } from "../middlewares/uploadMiddleware.js";

export const getAllGallery = async (req, res) => {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data gallery", error: err.message });
  }
};

export const uploadGalleryPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File foto wajib diupload" });
    }

    const item = await prisma.galleryItem.create({
      data: { url: req.file.path, caption: req.body.caption || null },
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Gagal upload foto", error: err.message });
  }
};

export const deleteGalleryPhoto = async (req, res) => {
  try {
    const item = await prisma.galleryItem.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!item) return res.status(404).json({ message: "Foto tidak ditemukan" });

    // Hapus dari Cloudinary juga, bukan cuma dari database
    const publicId = item.url.split("/").slice(-3).join("/").split(".")[0];
    await cloudinary.uploader.destroy(publicId).catch(() => {});

    await prisma.galleryItem.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Foto berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus foto", error: err.message });
  }
};
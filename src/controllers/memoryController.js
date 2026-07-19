import prisma from "../config/prisma.js";
import { cloudinary } from "../middlewares/uploadMiddleware.js";

export const getAllMemories = async (req, res) => {
  try {
    const memories = await prisma.memory.findMany({ orderBy: { date: "desc" } });
    res.json(memories);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data memories", error: err.message });
  }
};

export const createMemory = async (req, res) => {
  try {
    const { title, story, date } = req.body;

    if (!title || !story || !date) {
      return res.status(400).json({ message: "Title, story, dan date wajib diisi" });
    }

    const image = req.file ? req.file.path : null;

    const memory = await prisma.memory.create({
      data: { title, story, date: new Date(date), image },
    });

    res.status(201).json(memory);
  } catch (err) {
    res.status(500).json({ message: "Gagal menambah memory", error: err.message });
  }
};

export const updateMemory = async (req, res) => {
  try {
    const { title, story, date } = req.body;

    const existing = await prisma.memory.findUnique({ where: { id: Number(req.params.id) } });
    if (!existing) return res.status(404).json({ message: "Memory tidak ditemukan" });

    let image = existing.image;
    if (req.file) {
      if (existing.image) {
        const publicId = existing.image.split("/").slice(-3).join("/").split(".")[0];
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }
      image = req.file.path;
    }

    const memory = await prisma.memory.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(title && { title }),
        ...(story && { story }),
        ...(date && { date: new Date(date) }),
        image,
      },
    });

    res.json(memory);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengubah memory", error: err.message });
  }
};

export const deleteMemory = async (req, res) => {
  try {
    const memory = await prisma.memory.findUnique({ where: { id: Number(req.params.id) } });
    if (!memory) return res.status(404).json({ message: "Memory tidak ditemukan" });

    if (memory.image) {
      const publicId = memory.image.split("/").slice(-3).join("/").split(".")[0];
      await cloudinary.uploader.destroy(publicId).catch(() => {});
    }

    await prisma.memory.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Memory berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus memory", error: err.message });
  }
};
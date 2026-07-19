import prisma from "../config/prisma.js";

export const getAllStories = async (req, res) => {
  try {
    const stories = await prisma.storyEntry.findMany({
      orderBy: { date: "asc" },
    });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data story", error: err.message });
  }
};

export const getStoryById = async (req, res) => {
  try {
    const story = await prisma.storyEntry.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!story) return res.status(404).json({ message: "Story tidak ditemukan" });
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data story", error: err.message });
  }
};

export const createStory = async (req, res) => {
  try {
    const { title, description, date, image } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ message: "Title, description, dan date wajib diisi" });
    }

    const story = await prisma.storyEntry.create({
      data: { title, description, date: new Date(date), image },
    });
    res.status(201).json(story);
  } catch (err) {
    res.status(500).json({ message: "Gagal menambah story", error: err.message });
  }
};

export const updateStory = async (req, res) => {
  try {
    const { title, description, date, image } = req.body;

    const story = await prisma.storyEntry.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(date && { date: new Date(date) }),
        ...(image !== undefined && { image }),
      },
    });
    res.json(story);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Story tidak ditemukan" });
    }
    res.status(500).json({ message: "Gagal mengubah story", error: err.message });
  }
};

export const deleteStory = async (req, res) => {
  try {
    await prisma.storyEntry.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Story berhasil dihapus" });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Story tidak ditemukan" });
    }
    res.status(500).json({ message: "Gagal menghapus story", error: err.message });
  }
};
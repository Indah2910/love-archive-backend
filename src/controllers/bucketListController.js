import prisma from "../config/prisma.js";

export const getAllBucketList = async (req, res) => {
  try {
    const items = await prisma.bucketListItem.findMany({
      orderBy: { createdAt: "asc" },
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil bucket list", error: err.message });
  }
};

export const createBucketItem = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title wajib diisi" });
    }

    const item = await prisma.bucketListItem.create({
      data: { title, description },
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Gagal menambah item", error: err.message });
  }
};

export const toggleBucketItem = async (req, res) => {
  try {
    const existing = await prisma.bucketListItem.findUnique({ where: { id: Number(req.params.id) } });
    if (!existing) return res.status(404).json({ message: "Item tidak ditemukan" });

    const item = await prisma.bucketListItem.update({
      where: { id: Number(req.params.id) },
      data: { done: !existing.done },
    });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengubah status", error: err.message });
  }
};

export const deleteBucketItem = async (req, res) => {
  try {
    await prisma.bucketListItem.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Item berhasil dihapus" });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }
    res.status(500).json({ message: "Gagal menghapus item", error: err.message });
  }
};
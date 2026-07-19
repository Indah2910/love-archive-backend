import prisma from "../config/prisma.js";

export const getAllGuestbook = async (req, res) => {
  try {
    const entries = await prisma.guestbookEntry.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data guest book", error: err.message });
  }
};

export const createGuestbookEntry = async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({ message: "Nama dan pesan wajib diisi" });
    }

    const entry = await prisma.guestbookEntry.create({
      data: { name, message },
    });

    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengirim pesan", error: err.message });
  }
};

export const deleteGuestbookEntry = async (req, res) => {
  try {
    await prisma.guestbookEntry.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Pesan berhasil dihapus" });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Pesan tidak ditemukan" });
    }
    res.status(500).json({ message: "Gagal menghapus pesan", error: err.message });
  }
};
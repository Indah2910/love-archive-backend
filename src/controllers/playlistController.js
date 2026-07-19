import prisma from "../config/prisma.js";

export const getAllPlaylist = async (req, res) => {
  try {
    const songs = await prisma.playlistSong.findMany({
      orderBy: { sortOrder: "asc" },
    });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil playlist", error: err.message });
  }
};

export const createSong = async (req, res) => {
  try {
    const { title, artist, link, note, sortOrder } = req.body;

    if (!title || !artist || !link) {
      return res.status(400).json({ message: "Title, artist, dan link wajib diisi" });
    }

    const song = await prisma.playlistSong.create({
      data: { title, artist, link, note, sortOrder: sortOrder ? Number(sortOrder) : 0 },
    });

    res.status(201).json(song);
  } catch (err) {
    res.status(500).json({ message: "Gagal menambah lagu", error: err.message });
  }
};

export const deleteSong = async (req, res) => {
  try {
    await prisma.playlistSong.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Lagu berhasil dihapus" });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Lagu tidak ditemukan" });
    }
    res.status(500).json({ message: "Gagal menghapus lagu", error: err.message });
  }
};
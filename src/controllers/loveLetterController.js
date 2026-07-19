import prisma from "../config/prisma.js";

export const getAllLoveLetters = async (req, res) => {
  try {
    const letters = await prisma.loveLetter.findMany({
      orderBy: { date: "desc" },
    });
    res.json(letters);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data love letters", error: err.message });
  }
};

export const createLoveLetter = async (req, res) => {
  try {
    const { from, title, content, date } = req.body;

    if (!from || !title || !content || !date) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const letter = await prisma.loveLetter.create({
      data: { from, title, content, date: new Date(date) },
    });

    res.status(201).json(letter);
  } catch (err) {
    res.status(500).json({ message: "Gagal menambah love letter", error: err.message });
  }
};

export const deleteLoveLetter = async (req, res) => {
  try {
    await prisma.loveLetter.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Love letter berhasil dihapus" });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Love letter tidak ditemukan" });
    }
    res.status(500).json({ message: "Gagal menghapus love letter", error: err.message });
  }
};

export const updateLoveLetter = async (req, res) => {
  try {
    const { from, title, content, date } = req.body;

    const letter = await prisma.loveLetter.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(from && { from }),
        ...(title && { title }),
        ...(content && { content }),
        ...(date && { date: new Date(date) }),
      },
    });

    res.json(letter);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Love letter tidak ditemukan" });
    }
    res.status(500).json({ message: "Gagal mengubah love letter", error: err.message });
  }
};
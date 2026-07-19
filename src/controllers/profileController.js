import prisma from "../config/prisma.js";
import { cloudinary } from "../middlewares/uploadMiddleware.js";

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({ orderBy: { name: "asc" } });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data profil", error: err.message });
  }
};

export const upsertProfile = async (req, res) => {
  try {
    const { name } = req.params;
    const { role, bio, instagram } = req.body;

    if (!bio) {
      return res.status(400).json({ message: "Bio wajib diisi" });
    }

    const existing = await prisma.profile.findUnique({ where: { name } });

    let photo = existing?.photo || null;
    if (req.file) {
      if (existing?.photo) {
        const publicId = existing.photo.split("/").slice(-3).join("/").split(".")[0];
        await cloudinary.uploader.destroy(publicId).catch(() => {});
      }
      photo = req.file.path;
    }

    const profile = await prisma.profile.upsert({
      where: { name },
      update: { role, bio, instagram, photo },
      create: { name, role, bio, instagram, photo },
    });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Gagal menyimpan profil", error: err.message });
  }
};
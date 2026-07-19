import prisma from "./config/prisma.js";

try {
  const userCount = await prisma.user.count();
  console.log("Koneksi Prisma berhasil! Jumlah user saat ini:", userCount);
} catch (err) {
  console.error("Koneksi gagal:", err.message);
} finally {
  await prisma.$disconnect();
}
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createStorage = (folder) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `love-archive/${folder}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
    },
  });

export const uploadGalleryImage = multer({ storage: createStorage("gallery") });
export const uploadMemoryImage = multer({ storage: createStorage("memories") });
export const uploadProfileImage = multer({ storage: createStorage("profiles") });

export { cloudinary };
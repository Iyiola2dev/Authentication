import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary using environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

// Multer configuration for storing files in Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'event', // Folder name in Cloudinary
    format: async (req, file) => 'jpg', // Optional: set file format
    public_id: (req, file) => file.originalname.split('.')[0], // Optional: set file name
  },
});

const upload = multer({ storage });

export default upload;

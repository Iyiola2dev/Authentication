import Imageurl from "../models/imageModel.js";
import dotenv from "dotenv";
import cloudinary from 'cloudinary';

// Load environment variables
dotenv.config();

// Configure Cloudinary using environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

// Image uploader controller
export const uploadImages = async (req, res) => {
  const file = req.file;
  
  if (!file) {
    return res.status(400).json({
      message: "Image not uploaded, please upload your event's thumbnail",
    });
  }

  try {
    // Cloudinary automatically uploads the file via multer storage
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "event", // Folder in Cloudinary
    });

    // Save the Cloudinary URL to the database
    const newImage = new Imageurl({ imageUrl: result.secure_url });
    await newImage.save();

    res.status(200).json({ message: "Image uploaded successfully", imageUrl: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading image" });
  }
};

import express from "express";
import { createCategory, createEvent, createUser, getAllCategories, loginUser } from "../controllers/userController.js";
import { verifyJWToken } from "../middlewares/jwtAuth.js";
import { uploadImages } from "../controllers/imageController.js";
import upload from "../middlewares/multer.js";

//The router is named userRouter i could have named it anything
const router = express.Router();

//The routes
router.post("/login", loginUser);

//The route for registering a user
router.post("/register", createUser);

//The route for creation of events
router.post("/events",verifyJWToken, createEvent);

// Route to create a new category
router.post("/createCategories", createCategory);

// Route to fetch all categories
router.get("/all-categories", getAllCategories);

// image 
router.post("/imagesUrl", upload.single("images"), uploadImages)


export default router;

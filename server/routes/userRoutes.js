import express from "express";
import { createUser, loginUser } from "../controllers/userController.js";

//The router is named userRouter i could have named it anything
const router = express.Router();

//The routes
router.post("/login", loginUser);

//The route for registering a user
router.post("/register", createUser);

export default router;

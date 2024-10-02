import express from "express";
import { createEvent, createUser, loginUser } from "../controllers/userController.js";
import { verifyJWToken } from "../middlewares/jwtAuth.js";

//The router is named userRouter i could have named it anything
const router = express.Router();

//The routes
router.post("/login", loginUser);

//The route for registering a user
router.post("/register", createUser);

//The route for creation of events
router.post("/events",verifyJWToken, createEvent);

export default router;

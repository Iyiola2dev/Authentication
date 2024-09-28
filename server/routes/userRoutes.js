import express from "express";
import { createUser } from "../controllers/userController.js";

//The router is named userRouter i could have named it anything
const router = express.Router();

//The routes
router.get("/login", (req, res) => {
 const { email, password } = req.body;
});

//The route for registering a user
router.post("/register", createUser);

export default router;

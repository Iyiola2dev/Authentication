import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// This is the create user controller
export const createUser = async (req, res) => {
  try {
    const { userName, password, name, email } = req.body; // Destructure the request body from my schema

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const user = new User({
      name, // Include name from request
      userName,
      email,
      password: hashedPassword,
      // No role assignment since you don't want to assign roles
    });

    // Save the new user to the database
    await user.save();

    res.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating user", error });
  }
};

import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

// This is the login controller
export const loginUser = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { email, password } = req.body;
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //check for password and username
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Please provide a username and password" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Incorrect password" });
    }

    // Create a token for the user
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    console.log("Token generated:", token);

    res.status(200).json({
      status: "success",
      message: `${user.role} created successfully`,
      token,
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred while trying to login",
    });
  }
};

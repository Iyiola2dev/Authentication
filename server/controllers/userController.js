import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

//this was imported so that i can convert string to object id
import mongoose from "mongoose";
import Ievents from "../models/eventModel.js";
import Category from "../models/categoryModel.js";


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
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    console.log("Token generated:", token);
    console.log(user);

    res.status(200).json({
      status: "success",
      message: "login successful",
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

//Chaning old password to a new password
export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { userName } = req.params;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: "Invaild credentials" });
    }

    //
    const changedPassword = await bcrypt.compare(oldPassword, user.password);

    if (!changedPassword) {
      return res.status(401).json({ message: "Incorrect old password" });
    }

    if (oldPassword === newPassword) {
      return res.status(404).json({ message: "Input NewPassword" });
    }
    const saltRounds = 10;
    const newPasswordHashed = await bcrypt.hash(newPassword, saltRounds);

    user.password = newPasswordHashed;
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error fetching users" });
  }
};

export const createEvent = async (req, res) => {
  const {
    title,
    description,
    location,
    startDateTime,
    endDateTime,
    imageUrl,
    price,
    isFree,
    url,
    category,
  } = req.body;

  // The userid is set in my middleware jwtAuth
  const userId = req.userId; // And this is set in my authentication middleware

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User ID not found." });
  }

  // Validate category if provided
  if (category && !mongoose.Types.ObjectId.isValid(category)) {
    return res.status(400).json({ message: "Invalid category ID." });
  }

  try {
    // Creating a new event, and associating it with the logged-in user
    const newEvent = new Ievents({
      title,
      description,
      location,
      startDateTime,
      endDateTime,
      imageUrl,
      price,
      isFree,
      url,
      category: category, //This was where my error was coming from...i was passing category as a string instead of an object id
      organizer: userId, // Set the user ID as the organizer
    });

    await newEvent.save(); // Save the event to the database

    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error creating event", error: err.message });
  }
};

////
//category

export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ message: "please provide a name for the category" });
  }

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res
      .status(201)
      .json({
        message: "Category created successfully",
        category: newCategory,
      });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error creating category", error: err.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find({});

    // Return the categories in the response
    res.status(200).json({ categories });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error fetching categories", error: err.message });
  }
};

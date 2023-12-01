// Import necessary libraries and modules
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    // Extract user information from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt();
    // Hash the user's password with the generated salt
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new User instance with the hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    // Respond with the saved user details
    res.status(201).json(savedUser);
  } catch (err) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;
    // Find a user with the provided email in the database
    const user = await User.findOne({ email: email });

    // Check if the user exists
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    // If passwords don't match, respond with an error message
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    // Generate a JWT token for authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // Remove the password from the user object before sending it in the response
    delete user.password;
    // Respond with the token and user details
    res.status(200).json({ token, user });
  } catch (err) {
    // Handle errors and respond with an error message
    res.status(500).json({ error: err.message });
  }
};

// Import necessary libraries and modules
import express from "express";
import { login } from "../controllers/auth.js";

// Create an instance of the Express router
const router = express.Router();

// Define the login route
router.post("/login", login);

// Export the router
export default router;

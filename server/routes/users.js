// users.js

// Import the express library and relevant controllers/middleware
import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

// Create an Express router
const router = express.Router();

/* READ */
// Define routes for retrieving user details and user friends, with token verification middleware
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
// Define a route for adding or removing a friend, with token verification middleware
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

// Export the router for use in other files
export default router;

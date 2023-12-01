// posts.js

// Import the express library and relevant controllers/middleware
import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

// Create an Express router
const router = express.Router();

/* READ */
// Define routes for retrieving feed posts and user-specific posts, with token verification middleware
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
// Define a route for liking a post, with token verification middleware
router.patch("/:id/like", verifyToken, likePost);

// Export the router for use in other files
export default router;

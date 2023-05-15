import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ:
router.get("/", verifyToken, getFeedPosts); //shows every post in the database
router.get("/:userId/posts", verifyToken, getUserPosts); // only grab single users posts

// UPDATE:
router.patch("/:id/like", verifyToken, likePost); // used to like and unlike posts

export default router;

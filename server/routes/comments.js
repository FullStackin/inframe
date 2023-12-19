// In your server-side routes file (e.g., routes/comments.js)
import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
} from "../controllers/comments.js";

const router = express.Router();

// Make sure this matches the URL you are using in the fetch call
router.post("/posts/:id/comment", createComment);
router.patch("/posts/:postId/comment/:commentId", editComment);
router.delete("/posts/:postId/comment/:commentId", deleteComment);

export default router;

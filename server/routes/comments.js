// In your server-side routes file (e.g., routes/comments.js)
import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
} from "../controllers/comments.js";

const router = express.Router();

router.post("/:postId/comment", createComment);
router.patch("/:postId/comment/:commentId", editComment);
router.delete("/:postId/comment/:commentId", deleteComment);

export default router;

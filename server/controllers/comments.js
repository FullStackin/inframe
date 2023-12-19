import User from "../models/User.js";
import Post from "../models/Post.js";

export const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = {
      userId,
      comment,
    };

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $push: { comments: newComment } },
      { new: true }
    ).populate("comments.userId", "firstName lastName");

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit a comment
export const editComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { userId, comment } = req.body;

  try {
    const post = await Post.findById(postId);
    const commentIndex = post.comments.findIndex(
      (c) => c._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (post.comments[commentIndex].userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to edit this comment" });
    }

    post.comments[commentIndex].comment = comment;
    await post.save();

    // Repopulate user details after editing the comment
    const updatedPost = await Post.findById(postId).populate({
      path: "comments.userId",
      select: "firstName lastName",
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findById(postId);
    const commentIndex = post.comments.findIndex(
      (c) => c._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (post.comments[commentIndex].userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this comment" });
    }

    post.comments.splice(commentIndex, 1);
    await post.save();

    // Populate user details after deleting the comment
    const updatedPost = await Post.findById(postId).populate(
      "comments.userId",
      "firstName lastName"
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

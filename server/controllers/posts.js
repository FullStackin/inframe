// Import necessary models
import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    // Extract post information from the request body
    const { userId, description, picturePath } = req.body;

    // Find the user associated with the post
    const user = await User.findById(userId);

    // Create a new Post instance with user information and post details
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {}, // Initialize likes as an empty object
      comments: [], // Initialize comments as an empty array
    });

    // Save the new post to the database
    await newPost.save();

    // Retrieve all posts from the database
    const posts = await Post.find();
    // Respond with the updated list of posts
    res.status(201).json(posts);
  } catch (err) {
    // Handle errors and respond with an error message
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate(
      "comments.userId",
      "firstName lastName"
    );
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }).populate(
      "comments.userId",
      "firstName lastName"
    );
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    // Extract post id from the request parameters
    const { id } = req.params;
    // Extract userId from the request body
    const { userId } = req.body;

    // Find the post in the database
    const post = await Post.findById(id);
    // Check if the user has already liked the post
    const isLiked = post.likes.get(userId);

    // Toggle the like status for the user
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // Update the post in the database with the new likes information
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Respond with the updated post
    res.status(200).json(updatedPost);
  } catch (err) {
    // Handle errors and respond with an error message
    res.status(404).json({ message: err.message });
  }
};

/* CREATE COMMENT */
export const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;

    // Find the post in the database
    const post = await Post.findById(id);

    // Create a new comment object with only userId and comment
    const newComment = {
      userId, // just the userId is enough here
      comment,
    };

    // Add the new comment to the post
    post.comments.push(newComment);

    // Save the updated post to the database
    await post.save();

    // Optional: Populate user details in comments when returning the updated post
    const updatedPost = await Post.findById(id).populate(
      "comments.userId",
      "firstName lastName"
    );

    // Respond with the updated post
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

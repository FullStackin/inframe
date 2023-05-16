import Post from "../models/Post.js";
import User from "../models/User.js";

// CREATE:
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save(); // saves to the mongoDB

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// READ:

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
            res.status(404).json({ message: err.message });

    }
}

export const getUserPosts = async (req,res) => {
    try {
        const { userId } = req.params
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
            res.status(404).json({ message: err.message });

    }
}

// UPDATE:

export const likePost = async (req,res) => {
    try {
        const { id } = req.params; // comes from the query string
        const { userId } = req.body; // comes from the body
        const post = await Post.findById(id); // grabbing post information
        const isLiked = post.likes.get(userId); // grabbing if the user liked it or not.

        if (isLiked){
            post.likes.delete(userId); // deletes if already exists
        } else {
            post.likes.set(userId, true); // sets it if it doesn't exist.
        }

        const updatedPost = await Post.findByIdAndUpdate( // post by finding it first and passing it new likes
            id,
            { likes: post.likes },
            { new: true }
        );
        res.status(200).json(updatedPost); //pass in the updated post to update the frontend.
    } catch (err) {
            res.status(404).json({ message: err.message });

    }
}

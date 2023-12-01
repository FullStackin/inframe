// Import the mongoose library
import mongoose from "mongoose";

// Define the schema for the Post model
const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true } // Include timestamps for createdAt and updatedAt
);

// Create the Post model using the postSchema
const Post = mongoose.model("Post", postSchema);

// Export the Post model
export default Post;

// Import User model
import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    // Extract user id from the request parameters
    const { id } = req.params;
    // Find the user in the database by id
    const user = await User.findById(id);
    // Respond with the user details
    res.status(200).json(user);
  } catch (err) {
    // Handle errors and respond with an error message
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    // Extract user id from the request parameters
    const { id } = req.params;
    // Find the user in the database by id
    const user = await User.findById(id);

    // Retrieve information for each friend in parallel using Promise.all
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Format the friend information for response
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Respond with the formatted list of friends
    res.status(200).json(formattedFriends);
  } catch (err) {
    // Handle errors and respond with an error message
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    // Extract user id and friend id from the request parameters
    const { id, friendId } = req.params;
    // Find the user and friend in the database by their respective ids
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // Check if the friend is already in the user's friends list
    if (user.friends.includes(friendId)) {
      // If yes, remove the friend from the user's friends list
      user.friends = user.friends.filter((id) => id !== friendId);
      // Also, remove the user from the friend's friends list
      friend.friends = friend.friends.filter((friendId) => friendId !== id);
    } else {
      // If not, add the friend to the user's friends list
      user.friends.push(friendId);
      // Also, add the user to the friend's friends list
      friend.friends.push(id);
    }

    // Save the updated user and friend to the database
    await user.save();
    await friend.save();

    // Retrieve information for each friend in parallel using Promise.all
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Format the friend information for response
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Respond with the formatted list of friends
    res.status(200).json(formattedFriends);
  } catch (err) {
    // Handle errors and respond with an error message
    res.status(404).json({ message: err.message });
  }
};

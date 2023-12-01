// Importing createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the authentication slice
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

// Creating an authentication slice with reducers
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer to toggle between light and dark mode
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // Reducer to set user login information
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Reducer to clear user login information
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // Reducer to update user's friends list
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    // Reducer to set the list of posts
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    // Reducer to update a specific post in the list
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

// Exporting action creators and the reducer from the authentication slice
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;

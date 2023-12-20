import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import CommentForm from "../../components/CommentForm";


const Comment = ({ comment, onEdit, onDelete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);

  const handleEdit = () => {
    if (editMode && editedComment !== comment.comment) {
      onEdit(comment._id, editedComment);
    }
    setEditMode(!editMode);
  };

  const handleDelete = () => {
    onDelete(comment._id);
  };

  return (
    <Box key={comment._id} sx={{ mt: "1rem" }}>
      <Divider />
      {editMode ? (
        <Box display="flex" alignItems="center" gap="1rem">
          <TextField
            fullWidth
            size="small"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <IconButton onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </Box>
      ) : (
        <Typography variant="contained">
      <span style={{ color: 'orange' }}>
        {`${comment.userId.firstName} ${comment.userId.lastName}`}
      </span>
      {`: ${comment.comment}`}
    </Typography>
      )}
      <Box display="flex" justifyContent="flex-end">
        <IconButton size="small" onClick={() => setEditMode(!editMode)}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [localComments, setLocalComments] = useState(comments);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleCommentSubmit = async (commentText) => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include auth token if necessary
          },
          body: JSON.stringify({
            userId: loggedInUserId,
            comment: commentText,
          }),
        }
      );
      if (response.ok) {
        const updatedPost = await response.json();
        console.log(updatedPost); // inspect the data
        setLocalComments(updatedPost.comments);
      } else {
        // Handle errors (e.g., show a message to the user)
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  useEffect(() => {
    console.log("Comments:", comments); // Log initial comments
  }, [comments]);

  const handleEditComment = async (commentId, newComment) => {
    console.log("Editing Comment:", commentId, newComment);
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/comment/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: loggedInUserId,
            comment: newComment,
          }),
        }
      );

      const data = await response.json();
      console.log("Edit Response:", data);

      if (response.ok) {
        // Check if user details are included in comments
        const updatedComments = data.comments.map((c) => {
          return {
            ...c,
            userId: c.userId || { firstName: "Anonymous", lastName: "" },
          };
        });

        setLocalComments(updatedComments);
      } else {
        console.error("Error editing comment:", data.message);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );

      if (response.ok) {
        const updatedPost = await response.json();
        setLocalComments(updatedPost.comments); // Update local comments state
      } else {
        // Handle error (e.g., show a message to the user)
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {/* Comment Section */}
      {isComments && (
        <Box mt="0.5rem">
          {localComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
            />
          ))}
          <CommentForm onCommentSubmit={handleCommentSubmit} />
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;

// CommentForm.jsx
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const CommentForm = ({ onCommentSubmit }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // Call a function to submit the comment to the server
    onCommentSubmit(comment);

    // Optionally, clear the comment field after submission
    setComment('');
  };

  return (
    <Box>
      <TextField
        multiline
        rows={2}
        variant="outlined"
        fullWidth
        label="Add a comment"
        value={comment}
        onChange={handleCommentChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Comment
      </Button>
    </Box>
  );
};

export default CommentForm;

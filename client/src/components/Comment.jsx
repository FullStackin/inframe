// Comment.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

const Comment = ({ comment }) => {
  const { firstName, lastName, comment: commentText } = comment;

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight="bold">
        {`${firstName} ${lastName}:`}
      </Typography>
      <Typography variant="body1">{commentText}</Typography>
    </Box>
  );
};

export default Comment;

// Importing required component from Material-UI
import { Box } from "@mui/material";

// Functional Component - UserImage
const UserImage = ({ image, size = "60px" }) => {
  // JSX for rendering user image with specified size
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        // Displaying user image with provided path
        src={`http://localhost:3001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;

// Import the jsonwebtoken library
import jwt from "jsonwebtoken";

// Middleware to verify the authenticity of a token
export const verifyToken = async (req, res, next) => {
  try {
    // Retrieve the token from the request header
    let token = req.header("Authorization");

    // Check if the token is missing
    if (!token) {
      // If missing, respond with a 403 Forbidden status and message
      return res.status(403).send("Access Denied");
    }

    // Check if the token starts with "Bearer "
    if (token.startsWith("Bearer ")) {
      // If yes, remove "Bearer " to get the actual token
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify the token using the provided secret
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the verified user information to the request object
    req.user = verified;

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    // If there's an error during token verification, respond with a 500 Internal Server Error and the error message
    res.status(500).json({ error: err.message });
  }
};

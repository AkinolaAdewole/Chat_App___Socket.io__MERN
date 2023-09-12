import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

// Retrieve the JWT secret key from the environment variables
const secret = process.env.JWTKEY;

// Define the authentication middleware
const authMiddleWare = async (req, res, next) => {
  try {
    // Extract the JWT token from the "Authorization" header in the request
    const token = req.headers.authorization.split(" ")[1];
    
    // Check if a token exists
    if (token) {
      // Verify the token using the secret key
      const decoded = jwt.verify(token, secret);
      
      // Attach the decoded user ID to the request body (if it exists in the token)
      req.body._id = decoded?.id;
    }

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleWare;

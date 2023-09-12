// Import necessary modules and libraries
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res) => {
  // !Generate a salt and hash the user's password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;

  // Create a new user model instance with the request body data
  const newUser = new UserModel(req.body);
  const { username } = req.body;

  try {
    // Check if a user with the same username already exists
    const oldUser = await UserModel.findOne({ username });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    // Save the new user to the database
    const user = await newUser.save();

    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWTKEY, // Use a secret key for signing the token
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Respond with the newly registered user and the JWT
    res.status(200).json({ user, token });
  } catch (error) {
    // Handle any errors and respond with an error message
    res.status(500).json({ message: error.message });
  }
};

// Login User

// Login user with username and password
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find a user with the provided username
    const user = await UserModel.findOne({ username: username });

    if (user) {
      // Check if the provided password matches the stored hashed password
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        // If the password is incorrect, respond with an error
        res.status(400).json("Wrong password");
      } else {
        // If the password is correct, generate a JWT for authentication
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWTKEY, // Use the same secret key as during registration
          { expiresIn: "1h" } // Token expires in 1 hour
        );

        // Respond with the authenticated user and the JWT
        res.status(200).json({ user, token });
      }
    } else {
      // If no user with the provided username is found, respond with an error
      res.status(404).json("User not found");
    }
  } catch (err) {
    // Handle any errors and respond with an error message
    res.status(500).json(err);
  }
};

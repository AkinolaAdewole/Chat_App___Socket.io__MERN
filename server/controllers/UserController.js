// Import the 'UserModel' model and necessary libraries
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get a user by ID
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    // Find a user by their ID
    const user = await UserModel.findById(id);
    if (user) {
      // Remove the password field from the user document
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    // Find all users in the database
    let users = await UserModel.find();
    
    // Remove the password field from each user document
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

3

// Update a user's information
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdmin, password } = req.body;

  if (id === _id) {
    try {
      // If updating the password, hash it with bcrypt
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      // Update the user's information in the database
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      // Generate a new JWT token
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWTKEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("Access Denied! You can update only your own Account.");
  }
};



// Delete a user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdmin } = req.body;

  if (currentUserId == id || currentUserAdmin) {
    try {
      // Delete the user from the database
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User Deleted Successfully!");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied!");
  }
};

// Follow a user
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id == id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      // Find the user to follow and the user who is following
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        // Update the follower and following lists
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("You are already following this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};




// Unfollow a user
export const unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      // Find the user to unfollow and the user who is unfollowing
      const unFollowUser = await UserModel.findById(id);
      const unFollowingUser = await UserModel.findById(_id);

      if (unFollowUser.followers.includes(_id)) {
        // Update the follower and following lists to remove the relationship
        await unFollowUser.updateOne({ $pull: { followers: _id } });
        await unFollowingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("Unfollowed Successfully!");
      } else {
        res.status(403).json("You are not following this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

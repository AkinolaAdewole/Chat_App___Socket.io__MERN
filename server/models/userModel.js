import mongoose from "mongoose";

//! Define the UserSchema
const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesIn: String,
    worksAt: String,
    relationship: String,
    country: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

// Create a UserModel based on the UserSchema
const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;

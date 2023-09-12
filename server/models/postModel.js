// !Import the 'mongoose' library
import mongoose from "mongoose";

// Define a schema for posts
const postSchema = mongoose.Schema(
  {
    // Define a 'userId' field with a type of String, which is required
    userId: { type: String, required: true },

    // Define a 'desc' (description) field with a type of String, also required
    desc: { type: String, required: true },

    // Define a 'likes' field, which is currently an empty array
    likes: [],

    // Define a 'createdAt' field with a type of Date, which defaults to the current date and time
    createdAt: {
      type: Date,
      default: new Date(),
    },

    // Define an 'image' field with a type of String
    image: String,
  },
  {
    // Configure schema options, including timestamps
    timestamps: true,
  }
);

// Create a Mongoose model named "Posts" using the defined schema
var PostModel = mongoose.model("Posts", postSchema);

// Export the PostModel to make it available for other parts of your application
export default PostModel;

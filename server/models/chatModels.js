// Import the 'mongoose' library, which is a MongoDB object modeling tool
import mongoose from "mongoose";

// Define a new Mongoose schema for the 'Chat' model
const ChatSchema = new mongoose.Schema(
  {
    // Define a field called 'members' with a type of Array
    members: {
      type: Array,
    },
  },
  {
    // Configure schema options, in this case, enabling timestamps
    timestamps: true,
  }
);

// Create a Mongoose model named "Chat" using the defined schema
const ChatModel = mongoose.model("Chat", ChatSchema);

// Export the ChatModel to make it available for other parts of your application
export default ChatModel;

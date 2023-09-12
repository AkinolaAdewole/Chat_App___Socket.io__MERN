// !Import the 'ChatModel' model
import ChatModel from "../models/chatModels";

// Function to create a new chat
const createChat = async (req, res) => {
  // Create a new chat instance with the members specified in the request body
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    // Save the new chat document to the database
    const result = await newChat.save();
    // Send a JSON response with the created chat document
    res.status(200).json(result);
  } catch (error) {
    // Handle any errors and send a 500 (Internal Server Error) response
    res.status(500).json(error);
  }
};

// Function to retrieve chats for a user
const userChats = async (req, res) => {
  try {
    // Find chat documents where the provided userId is in the 'members' array
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    // Send a JSON response with the found chat documents
    res.status(200).json(chat);
  } catch (error) {
    // Handle any errors and send a 500 (Internal Server Error) response
    res.status(500).json(error);
  }
};

// Function to find a chat between two specific users
const findChat = async (req, res) => {
  try {
    // Find a chat document where both provided user IDs are in the 'members' array
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    // Send a JSON response with the found chat document
    res.status(200).json(chat);
  } catch (error) {
    // !Handle any errors and send a 500 (Internal Server Error) response
    res.status(500).json(error);
  }
};

// Export the functions for use in other parts of your application
export { createChat, userChats, findChat };

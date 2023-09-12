// Import the 'MessageModel' model
import MessageModel from "../models/messageModel.js";

// Function to add a new message to a chat
export const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  // Create a new message instance with the provided chatId, senderId, and text
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });

  try {
    // Save the new message to the database
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    // Handle any errors and send a 500 (Internal Server Error) response
    res.status(500).json(error);
  }
};

// Function to get messages for a specific chat
export const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    // Find messages in the database that belong to the specified chatId
    const result = await MessageModel.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    // Handle any errors and send a 500 (Internal Server Error) response
    res.status(500).json(error);
  }
};

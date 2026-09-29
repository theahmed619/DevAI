import { Chat } from "../models/Chat.js";
import { Conversation } from "../models/Conversation.js";

export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;

    const chat = await Chat.create({
      user: userId,
    });

    res.json(chat);
  } catch (error) {
    console.error("Create chat error:", error);
    res.status(500).json({
      message: "Failed to create new chat.",
    });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(chats);
  } catch (error) {
    console.error("Get all chats error:", error);
    res.status(500).json({
      message: "Failed to load chats.",
    });
  }
};

export const addConversation = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat)
      return res.status(404).json({
        message: "No chat with this id",
      });

    const conversation = await Conversation.create({
      chat: chat._id,
      question: req.body.question,
      answer: req.body.answer,
    });

    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { latestMessage: req.body.question },
      { new: true }
    );

    res.json({
      conversation,
      updatedChat,
    });
  } catch (error) {
    console.error("Add conversation error:", error);
    res.status(500).json({
      message: "Failed to save message.",
    });
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({ chat: req.params.id });

    if (!conversation)
      return res.status(404).json({
        message: "No conversation with this id",
      });

    res.json(conversation);
  } catch (error) {
    console.error("Get conversation error:", error);
    res.status(500).json({
      message: "Failed to load messages.",
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat)
      return res.status(404).json({
        message: "No chat with this id",
      });

    if (chat.user.toString() !== req.user._id.toString())
      return res.status(403).json({
        message: "Unauthorized",
      });

    await chat.deleteOne();

    res.json({
      message: "Chat Deleted",
    });
  } catch (error) {
    console.error("Delete chat error:", error);
    res.status(500).json({
      message: "Failed to delete chat.",
    });
  }
};

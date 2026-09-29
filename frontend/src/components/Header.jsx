import React from "react";
import { ChatData } from "../context/ChatContext";

const Header = () => {
  const { chats } = ChatData();
  return (
    <div className="mb-6 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
        Hello! 👋
      </h1>
      <p className="text-lg text-gray-300">How can I help you today?</p>
      {chats && chats.length === 0 && (
        <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl backdrop-blur-sm">
          <p className="text-purple-300">✨ Create a new chat to continue</p>
        </div>
      )}
    </div>
  );
};

export default Header;
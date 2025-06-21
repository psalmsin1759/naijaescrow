'use client';

import React, { useState } from "react";
import Logo from "@/components/shared/Logo";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";

export default function BuyerHeader() {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "seller", text: "Hello! Let me know if you have any questions." },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, { from: "buyer", text: message }]);
    setMessage("");
  };

  return (
    <>
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Chat with seller</span>
          <button
            onClick={() => setShowChat(true)}
            className="text-primary text-xl hover:text-primary-dark transition"
          >
            <FaComments />
          </button>
        </div>
      </header>

      {/* Slide-out chat */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-lg z-50 transition-transform duration-300 flex flex-col ${
          showChat ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-800">Chat with Seller</h3>
          <button
            onClick={() => setShowChat(false)}
            className="text-gray-600 hover:text-red-500"
          >
            <FaTimes />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`text-sm max-w-[75%] p-3 rounded-lg ${
                msg.from === "buyer"
                  ? "bg-primary text-white self-end ml-auto"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="p-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

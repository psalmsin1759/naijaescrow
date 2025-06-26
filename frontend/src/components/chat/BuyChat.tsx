"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { useOrder } from "@/context/OrderContext";
import { initSocket } from "@/utils/socket";
import { getChatHistory, ChatMessage } from "@/utils/api/Chat";
import { ChatBubble } from "./ChatBubble";

interface ChatProps {
  showChat: boolean;
  hideChat: () => void;
}


export default function BuyChat({ showChat, hideChat }: ChatProps) {
  const { orderContext } = useOrder();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socketRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null); 

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  
  setTimeout(scrollToBottom, 100); 
}, [messages]);


  const fetchChats = async (orderId: string) => {
    const res = await getChatHistory(orderId);
    if (res.success && Array.isArray(res.data)) {
      setMessages(res.data);
    }
  };

  useEffect(() => {
    if (!orderContext?._id) return;

    const socket = initSocket();
    socketRef.current = socket;

    const roomId = orderContext._id;

    socket.emit("joinRoom", roomId);
    fetchChats(roomId);

    socket.on("receiveMessage", (msg: ChatMessage) => {
      if (msg.orderId === roomId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [orderContext]);

  const handleSend = () => {
    if (!message.trim() || !socketRef.current || !orderContext?._id) return;

    const msg = {
      orderId: orderContext._id,
      senderId: orderContext.buyerName,
      senderRole: "buyer",
      message,
      businessId: orderContext.businessId
    };

    socketRef.current.emit("sendMessage", msg);
    setMessage("");
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-lg z-50 transition-transform duration-300 flex flex-col ${
        showChat ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h3 className="font-semibold text-gray-800">Chat with Seller</h3>
        <button onClick={hideChat} className="text-gray-600 hover:text-red-500">
          <FaTimes />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatBubble key={index} chatMessage={msg} />
        ))}
        <div ref={messagesEndRef} /> {/* ✅ Anchor element for scrolling */}
      </div>

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
  );
}

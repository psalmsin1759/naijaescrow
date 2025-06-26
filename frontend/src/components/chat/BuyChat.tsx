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

let typingTimeout: NodeJS.Timeout;

export default function BuyChat({ showChat, hideChat }: ChatProps) {
  const { orderContext } = useOrder();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socketRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUser, setTypingUser] = useState<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

    socket.emit("joinRoom", { type: "order", id: roomId });
    fetchChats(roomId);

    socket.on("receiveMessage", (msg: ChatMessage) => {
      if (msg.orderId === roomId) {
        setMessages((prev) => [...prev, msg]);

        // Send read acknowledgment
        socket.emit("messageRead", {
          messageId: msg._id,
          orderId: msg.orderId,
        });
      }
    });

    socket.on("typing", ({ senderId }) => {
      setTypingUser(senderId);
    });

    socket.on("stopTyping", () => {
      setTypingUser(null);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [orderContext]);

  const handleSend = () => {
    if (!message.trim() || !socketRef.current || !orderContext?._id) return;

    const newMsg: ChatMessage = {
      orderId: orderContext._id,
      senderId: orderContext.buyerName,
      senderRole: "buyer",
      message,
      businessId: orderContext.businessId,
      createdAt: new Date().toISOString(),
      //isRead: false, // assume unread when sending
    };

    socketRef.current.emit("sendMessage", newMsg);
    setMessage("");

    socketRef.current.emit("stopTyping", {
      orderId: orderContext._id,
      senderId: orderContext.buyerName,
    });
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setMessage(text);

    if (socketRef.current && orderContext?._id) {
      socketRef.current.emit("typing", {
        orderId: orderContext._id,
        senderId: orderContext.buyerName,
      });

      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        socketRef.current.emit("stopTyping", {
          orderId: orderContext._id,
          senderId: orderContext.buyerName,
        });
      }, 2000);
    }
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

        {typingUser && (
          <div className="text-xs text-gray-400 italic">
            {typingUser} is typing...
          </div>
        )}

        <div ref={messagesEndRef} />
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
            onChange={handleTyping}
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

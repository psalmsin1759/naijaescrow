"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { useOrder } from "@/context/OrderContext";
import { initSocket } from "@/utils/socket";

interface ChatProps {
  showChat: boolean;
  hideChat: () => void;
}

interface ChatMessage {
  orderId: string;
  senderId: string;
  senderRole: 'buyer' | 'seller'; 
  message?: string;
}

export default function BuyChat({ showChat, hideChat }: ChatProps) {
  const { orderContext } = useOrder();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socketRef = useRef<any>(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!orderContext) return;

    const socket = initSocket();
    socketRef.current = socket;

    socket.emit("joinRoom", orderContext._id);

    socket.on("receiveMessage", (msg: ChatMessage) => {
      console.log (msg);
      if (msg.orderId === orderContext._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [orderContext]);

  const handleSend = () => {

   
  if (!message.trim() || !socketRef.current || !orderContext) return;

  const msg: ChatMessage = {
    orderId : orderContext._id!,
    senderId: orderContext.buyerName,
    senderRole: "buyer",
    message,
  };

  console.log (msg)
;
  

  socketRef.current.emit("sendMessage", msg);
  //setMessages((prev) => [...prev, msg]);
  setMessage("");
};


  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-lg z-50 transition-transform duration-300 flex flex-col ${
        showChat ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h3 className="font-semibold text-gray-800">
          Chat with Seller 
        </h3>
        <button onClick={hideChat} className="text-gray-600 hover:text-red-500">
          <FaTimes />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm max-w-[75%] p-3 rounded-lg ${
              msg.senderRole === "buyer"
                ? "bg-primary text-white self-end ml-auto"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {msg.message}
          </div>
        ))}
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

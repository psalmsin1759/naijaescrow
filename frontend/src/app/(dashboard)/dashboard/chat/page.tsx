"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { getChatByBusinessId, ChatMessage } from "@/utils/api/Chat";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { initSocket } from "@/utils/socket";

export default function ChatPage() {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [selectedChatOrderId, setSelectedChatOrderId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const [typingUser, setTypingUser] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socketRef = useRef<any>(null);

  const { auth } = useAuth();
  const businessId = auth?.business;
  console.log (businessId);

  const fetchChatHistory = async (bizId: string) => {
    const res = await getChatByBusinessId(bizId);
    if (res.success && res.data!.length > 0) {
      const fetchedChats = res.data!;
      setChats(fetchedChats);

      const firstOrderId = fetchedChats[0].orderId;
      setSelectedChatOrderId(firstOrderId);

      const socket = initSocket();
      socketRef.current = socket;

      const uniqueOrderIds = Array.from(new Set(fetchedChats.map((c) => c.orderId)));
      uniqueOrderIds.forEach((orderId) => {
        console.log ("orderId: " + orderId);
        socket.emit("joinRoom",  { type: "order", id: orderId });
      });

      socket.on("receiveMessage", (msg: ChatMessage) => {
        setChats((prevChats) => {
          const alreadyExists = prevChats.some(
            (m) => m.createdAt === msg.createdAt && m.message === msg.message
          );
          if (alreadyExists) return prevChats;

          if (msg.orderId === selectedChatOrderId) {
            setMessages((prevMessages) => [...prevMessages, msg]);
          }
          return [...prevChats, msg];
        });

        if (msg.orderId === selectedChatOrderId) {
          socket.emit("messageRead", { messageId: msg._id, orderId: msg.orderId });
        } else {
          socket.emit("messageDelivered", { messageId: msg._id, orderId: msg.orderId });
        }
      });

      socket.on("typing", ({ senderId }) => setTypingUser(senderId));
      socket.on("stopTyping", () => setTypingUser(null));

      return () => {
        socket.disconnect();
      };
    }
  };

  useEffect(() => {
    if (!selectedChatOrderId) return;
    const filteredMessages = chats.filter((msg) => msg.orderId === selectedChatOrderId);
    setMessages(filteredMessages);
  }, [selectedChatOrderId, chats]);

  useEffect(() => {
    if (!businessId) return;
    fetchChatHistory(businessId);
  }, [businessId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !selectedChatOrderId) return;

    const newMsg: ChatMessage = {
      orderId: selectedChatOrderId,
      senderId: auth!.adminFirstName!,
      senderRole: "seller",
      message: input,
      businessId: businessId,
      createdAt: new Date().toISOString(),
    };

    socketRef.current.emit("sendMessage", newMsg);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-full flex bg-white p-2">
        {/* Sidebar */}
        <div className="w-1/3 md:w-1/4 bg-white border-r overflow-y-auto">
          <div className="p-4 font-bold text-lg border-b">Chats</div>
          {Array.from(new Set(chats.map((c) => c.orderId))).map((orderId) => {
            const chatPreview = chats.find((c) => c.orderId === orderId);
            return (
              <div
                key={orderId}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 transition ${
                  selectedChatOrderId === orderId ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedChatOrderId(orderId)}
              >
                <FaUserCircle size={28} className="text-gray-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{chatPreview?.senderId}</span>
                  <span className="text-xs text-gray-400 truncate max-w-[150px]">
                    {chatPreview?.message}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 bg-white border-b text-lg font-semibold shadow-sm">
            Chat with {messages.find((m) => m.orderId === selectedChatOrderId)?.senderId ?? "..."}
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.senderRole === "seller" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs text-sm shadow ${
                    msg.senderRole === "seller" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.message}
                </div>
                <span className="text-[10px] text-gray-400 mt-1">
                  {format(new Date(msg.createdAt), "hh:mm a")}
                </span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="p-4 bg-white border-t flex flex-col">
            {typingUser && (
              <div className="text-xs text-gray-400 italic mb-1 px-1">
                {typingUser} is typing...
              </div>
            )}
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  socketRef.current.emit("typing", {
                    orderId: selectedChatOrderId,
                    senderId: auth?.adminFirstName,
                  });

                  if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
                  typingTimeoutRef.current = setTimeout(() => {
                    socketRef.current.emit("stopTyping", {
                      orderId: selectedChatOrderId,
                      senderId: auth?.adminFirstName,
                    });
                  }, 2000);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-primary text-white p-2 rounded-full hover:bg-primary"
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Logo from "@/components/shared/Logo";

import BuyChat from "../chat/BuyChat";
import { FaComments } from "react-icons/fa";
import { useOrder } from "@/context/OrderContext";
import { initSocket } from "@/utils/socket";
import { ChatMessage } from "@/utils/api/Chat";

export default function BuyerHeader() {
  const { orderContext } = useOrder();
  const [hasUnread, setHasUnread] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!orderContext?._id) return;

    const socket = initSocket();
    socketRef.current = socket;

    socket.emit("joinRoom", orderContext._id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    socket.on("receiveMessage", (data: ChatMessage) => {
      setHasUnread(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [orderContext]);

  const [showChat, setShowChat] = useState(false);
  const hideChat = () => {
    setHasUnread(false);
    setShowChat(false);
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
            className="relative cursor-pointer text-primary text-xl hover:text-primary-dark transition"
          >
            <FaComments />
            {hasUnread && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            )}
          </button>
        </div>
      </header>

      {/* Slide-out chat */}
      <BuyChat showChat={showChat} hideChat={hideChat} />
    </>
  );
}

'use client';

import React, { useState } from "react";
import Logo from "@/components/shared/Logo";

import BuyChat from "../chat/BuyChat";
import { FaComments } from "react-icons/fa";

export default function BuyerHeader() {
  
  const [showChat , setShowChat] = useState(false);
  const hideChat = () => {
    setShowChat(false);
    }
  
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
      <BuyChat showChat={showChat} hideChat={hideChat} />
      
    </>
  );
}

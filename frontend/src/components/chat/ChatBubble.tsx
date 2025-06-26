"use client";

import React from "react";
import { format } from "date-fns";
import { ChatMessage } from "../../utils/api/Chat";

interface ChatMessageProps {
  chatMessage: ChatMessage;
}

export const ChatBubble = ({ chatMessage }: ChatMessageProps) => {
  const isBuyer = chatMessage.senderRole === "buyer";

  return (
    <div className={`w-full flex ${isBuyer ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-[75%] flex flex-col ${isBuyer ? "items-end" : "items-start"} space-y-1`}>
        <span className="text-xs text-gray-500">{chatMessage.senderId}</span>

        <div
          className={`relative px-4 py-3 rounded-xl shadow-md break-words text-sm leading-relaxed ${
            isBuyer
              ? "bg-primary text-white rounded-br-none"
              : "bg-gray-100 text-gray-800 rounded-bl-none"
          }`}
        >
          <p>{chatMessage.message}</p>

          <div
            className={`mt-2 text-[10px] flex items-center gap-1 justify-end ${
              isBuyer ? "text-white/70" : "text-gray-500"
            }`}
          >
            <span>{format(new Date(chatMessage.createdAt), "hh:mm a")}</span>
            {isBuyer &&
              (chatMessage.isRead ? (
                <span className="text-xs">✓</span>
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-white/50 inline-block" />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";
import { useState } from "react";

export default function ChatWindow({ messages }) {
  return (
    <div className="bg-zinc-800 rounded-xl p-4 h-80 overflow-y-auto space-y-2">
      {messages.length === 0 && (
        <p className="text-zinc-400 text-sm">No messages yet...</p>
      )}

      {messages.map((msg, index) => (
        <div
          key={index}
          className="bg-zinc-700 px-3 py-2 rounded-lg text-sm"
        >
          {msg.type === "text"
  ? "🔐 " + msg.content
  : "📎 Encrypted File Sent"}

        </div>
      ))}
    </div>
  );
}
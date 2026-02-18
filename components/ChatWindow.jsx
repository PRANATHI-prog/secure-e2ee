"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";

export default function ChatWindow({ chatId, selectedUser }) {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatId) return;

    // 🔥 Listen to messages like WhatsApp realtime
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);

  return (
    <div className="h-80 bg-zinc-800 rounded-xl p-4 overflow-y-auto mb-4">

      {/* 👤 Selected user header */}
      {selectedUser && (
        <div className="mb-3 text-sm text-gray-300">
          Chatting with: <b>{selectedUser.name}</b>
        </div>
      )}

      {/* 💬 MESSAGE AREA */}
      {!chatId ? (
        <p>Select a user to start chatting...</p>
      ) : messages.length === 0 ? (
        <p>No messages yet...</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="mb-2">

            <b>{msg.user}</b>:{" "}

            {/* 📎 FILE MESSAGE */}
            {msg.type === "file" ? (
              <a
                href={`data:application/octet-stream;base64,${msg.fileData}`}
                download={msg.fileName}
                className="text-blue-400 underline"
              >
                📎 {msg.fileName}
              </a>
            ) : (
              msg.text
            )}

          </div>
        ))
      )}
    </div>
  );
}

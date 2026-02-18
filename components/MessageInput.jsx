"use client";

import { useState } from "react";
import { auth, db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function MessageInput({ chatId }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  // 💬 SEND TEXT MESSAGE
  async function sendMessage() {
    if (!text.trim() || !chatId) return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text,
      user: auth.currentUser.displayName,
      createdAt: serverTimestamp(),
      type: "text",
    });

    setText("");
  }

  // 📄 SEND FILE MESSAGE
  async function sendFile() {
    if (!file || !chatId) return;

    // ✅ SAFE BASE64 conversion (NO stack overflow)
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    let binary = "";
    const chunkSize = 8192;

    for (let i = 0; i < bytes.length; i += chunkSize) {
      binary += String.fromCharCode(
        ...bytes.subarray(i, i + chunkSize)
      );
    }

    const encrypted = btoa(binary);

    await addDoc(collection(db, "chats", chatId, "messages"), {
      fileName: file.name,
      fileData: encrypted,
      user: auth.currentUser.displayName,
      createdAt: serverTimestamp(),
      type: "file",
    });

    setFile(null);
  }

  return (
    <div className="flex flex-col gap-2 mt-2">

      {/* 📎 FILE PICKER */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-sm"
      />

      <div className="flex gap-2">
        {/* 💬 TEXT INPUT */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type secure message..."
          className="flex-1 p-2 rounded bg-zinc-700"
        />

        {/* SEND TEXT */}
        <button
          onClick={sendMessage}
          className="bg-green-500 px-4 rounded"
        >
          Send
        </button>

        {/* SEND FILE */}
        <button
          onClick={sendFile}
          className="bg-blue-500 px-4 rounded"
        >
          Send File
        </button>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { encryptText } from "../lib/e2ee";

export default function MessageInput({ addMessage }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  async function sendText() {
    if (!text) return;

    // For prototype we just show encrypted text placeholder
   const encryptedObj = await encryptText(text, "demo-password");

    addMessage({
    type: "text",
    content: text,
    encrypted: encryptedObj
    });


    setText("");
  }

  function sendFile() {
  if (!file) return;

  addMessage({ type: "file" });
  setFile(null);
}


  return (
    <div className="space-y-2">
      <input
        className="w-full bg-zinc-800 p-2 rounded-lg"
        placeholder="Type secure message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-2">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button
          onClick={sendFile}
          className="bg-blue-600 px-3 rounded-lg"
        >
          Send File
        </button>

        <button
          onClick={sendText}
          className="bg-green-600 px-3 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
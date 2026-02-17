"use client";
import CloudBackup from "../components/CloudBackup";
import { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";

export default function Home() {
  const [mode, setMode] = useState("peer");
  const [peerMessages, setPeerMessages] = useState<any[]>([]);
  const [groupMessages, setGroupMessages] = useState<any[]>([]);


 function addMessage(msg: any) {
  if (mode === "peer") {
    setPeerMessages((prev) => [...prev, msg]);
  } else {
    setGroupMessages((prev) => [...prev, msg]);
  }
}


  return (
    
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold">🔐 Secure Chat Prototype</h1>

        <CloudBackup />
        <div className="flex gap-2">
  <button
    onClick={() => setMode("peer")}
    className={`px-3 py-1 rounded-lg ${
      mode === "peer" ? "bg-blue-600" : "bg-zinc-700"
    }`}
  >
    👤 Peer Chat
  </button>

  <button
    onClick={() => setMode("group")}
    className={`px-3 py-1 rounded-lg ${
      mode === "group" ? "bg-blue-600" : "bg-zinc-700"
    }`}
  >
    👥 Group Chat
  </button>
</div>

        <ChatWindow
  messages={mode === "peer" ? peerMessages : groupMessages}
/>


        <MessageInput addMessage={addMessage} />
      </div>
    </main>
  );
}

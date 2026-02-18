"use client";

import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Login from "../components/Login";
import UserSearch from "../components/UserSearch";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";

export default function Home() {
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // 🔐 Auth Listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // 🧠 Unique Chat ID (same for both users)
  function getChatId(u1, u2) {
    return [u1.uid, u2.uid].sort().join("_");
  }

  // 🚪 If not logged in → show login
  if (!user) return <Login />;

  return (
    <main className="min-h-screen bg-black text-white flex">

      {/* 🧑 LEFT SIDEBAR */}
      <div className="w-1/3 border-r border-zinc-800 p-4">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h2 className="font-bold">{user.displayName}</h2>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>

          <button
            onClick={() => signOut(auth)}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        <UserSearch selectUser={setSelectedUser} />
      </div>

      {/* 💬 RIGHT CHAT AREA */}
      <div className="flex-1 flex flex-col p-6">

        <h1 className="text-xl font-bold mb-4">
          🔐 Secure Messaging Prototype
        </h1>

        <ChatWindow
          chatId={selectedUser ? getChatId(user, selectedUser) : null}
          selectedUser={selectedUser}
        />

        {selectedUser && (
          <MessageInput
            chatId={getChatId(user, selectedUser)}
          />
        )}
      </div>
    </main>
  );
}

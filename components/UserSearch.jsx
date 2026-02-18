"use client";

import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function UserSearch({ selectUser }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 Load all users from Firestore
  useEffect(() => {
    async function loadUsers() {
      const snap = await getDocs(collection(db, "users"));

      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // ❌ remove yourself from list
      const filteredUsers = list.filter(
        (u) => u.uid !== auth.currentUser?.uid
      );

      setUsers(filteredUsers);
    }

    loadUsers();
  }, []);

  // 🔎 Search filter
  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 bg-zinc-900 rounded-xl">

      <input
        placeholder="🔎 Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-3 rounded bg-black border border-zinc-700"
      />

      {filtered.length === 0 ? (
        <p className="text-sm text-gray-400">No users found</p>
      ) : (
        filtered.map((u) => (
          <div
            key={u.uid}
            onClick={() => selectUser(u)}
            className="p-2 hover:bg-zinc-800 cursor-pointer rounded"
          >
            {u.name}
          </div>
        ))
      )}
    </div>
  );
}

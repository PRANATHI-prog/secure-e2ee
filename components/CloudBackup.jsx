"use client";
import { useState } from "react";

export default function CloudBackup() {
  const [connected, setConnected] = useState(false);

  function connectCloud() {
    // Simulation only (no real API yet)
    setConnected(true);
  }

  return (
    <div className="bg-zinc-800 p-4 rounded-xl space-y-2">
      <h2 className="text-sm font-semibold">Encrypted Cloud Backup</h2>

      {!connected ? (
        <button
          onClick={connectCloud}
          className="bg-purple-600 px-3 py-1 rounded-lg"
        >
          ☁️ Connect Google Drive / iCloud
        </button>
      ) : (
        <p className="text-green-400 text-sm">
          ✔ Cloud connected. Encrypted data will be backed up to user storage.
        </p>
      )}
    </div>
  );
}

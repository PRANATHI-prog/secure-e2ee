"use client";
import { useState } from "react";
import { decryptFile } from "../lib/e2ee";

export default function DecryptForm() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");

  async function handleDecrypt() {
    if (!file || !password) {
      alert("Select encrypted file and password");
      return;
    }

    const buffer = await file.arrayBuffer();
    const decrypted = await decryptFile(buffer, password);

    const blob = new Blob([decrypted]);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "decrypted_file";
    a.click();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Decrypt File</h2>

      <input
        type="file"
        className="w-full text-sm bg-zinc-800 p-2 rounded-lg"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <input
        type="password"
        placeholder="Enter password"
        className="w-full bg-zinc-800 p-2 rounded-lg"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleDecrypt}
        className="w-full bg-green-600 hover:bg-green-700 transition rounded-lg py-2 font-medium"
      >
        Decrypt
      </button>
    </div>
  );
}

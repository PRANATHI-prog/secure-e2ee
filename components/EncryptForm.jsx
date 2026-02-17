"use client";
import { useState } from "react";
import { encryptFile } from "../lib/e2ee";

export default function EncryptForm() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");

  async function handleEncrypt() {
    if (!file || !password) {
      alert("Select file and enter password");
      return;
    }

    const result = await encryptFile(file, password);

    const blob = new Blob([result.salt, result.iv, result.encrypted]);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = file.name + ".enc";
    a.click();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Encrypt File</h2>

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
        onClick={handleEncrypt}
        className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-2 font-medium"
      >
        Encrypt
      </button>
    </div>
  );
}

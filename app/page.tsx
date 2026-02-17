import EncryptForm from "../components/EncryptForm";
import DecryptForm from "../components/DecryptForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-zinc-900 rounded-2xl shadow-lg p-8 space-y-8">

        <div className="text-center">
          <h1 className="text-3xl font-bold">🔐 Secure E2EE File Vault</h1>
          <p className="text-zinc-400 mt-2">
            Client-side AES-256 encryption using Web Crypto API.
            Files never leave your device.
          </p>
        </div>

        <EncryptForm />

        <hr className="border-zinc-700"/>

        <DecryptForm />

      </div>
    </main>
  );
}

"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Login() {

  async function signIn() {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      // ⭐ THIS PART SAVES USER TO FIRESTORE
      await setDoc(doc(db, "users", result.user.uid), {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
      });

    } catch (err) {
      if (err.code !== "auth/cancelled-popup-request") {
        console.error(err);
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <button onClick={signIn} className="bg-blue-600 px-6 py-3 rounded-xl">
        🔐 Sign in with Google
      </button>
    </div>
  );
}

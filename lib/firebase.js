import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcvSuO_r0HZ0b6ohUSk8D-YdCQrPwZtfY", 
  authDomain: "chat-app-96677.firebaseapp.com",
  projectId: "chat-app-96677",
  storageBucket: "chat-app-96677.firebasestorage.app",
  messagingSenderId: "731005485558",
  appId: "1:731005485558:web:dedea311bcc27b948687d7"   
};

const app = initializeApp(firebaseConfig);   // ✅ FIRST create app

export const auth = getAuth(app);            // ✅ THEN auth
export const db = getFirestore(app);         // ✅ THEN firestore
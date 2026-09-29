import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "devai-ea86e.firebaseapp.com",
  projectId: "devai-ea86e",
  storageBucket: "devai-ea86e.firebasestorage.app",
  messagingSenderId: "575177761240",
  appId: "1:575177761240:web:c3578012ee7f2f5486d2ad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
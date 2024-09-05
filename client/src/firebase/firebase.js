// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsdrykoqe-lieqmRFPOpZF_nsRbeImJv8",
  authDomain: "fire-base-blog-b72f3.firebaseapp.com",
  projectId: "fire-base-blog-b72f3",
  storageBucket: "fire-base-blog-b72f3.appspot.com",
  messagingSenderId: "563885133249",
  appId: "1:563885133249:web:88a7d0a58b7f9550647340",
  measurementId: "G-MHRK6YXG6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore(app);

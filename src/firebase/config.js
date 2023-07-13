// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCz6GrIQYYPhKg6SBSswI9jSBqNAx6mnHA",
  authDomain: "miniblog-ref-8aa5b.firebaseapp.com",
  projectId: "miniblog-ref-8aa5b",
  storageBucket: "miniblog-ref-8aa5b.appspot.com",
  messagingSenderId: "824931705053",
  appId: "1:824931705053:web:04b92d8f3a03c8cdcd3b34",
  measurementId: "G-9BB43NJYJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
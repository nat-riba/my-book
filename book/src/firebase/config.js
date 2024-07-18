import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYTmWrkdcmvyYXA6k11SY44jt9WzL7VGY",
  authDomain: "my-book-4caf7.firebaseapp.com",
  projectId: "my-book-4caf7",
  storageBucket: "my-book-4caf7.appspot.com",
  messagingSenderId: "438288396326",
  appId: "1:438288396326:web:67c80c0ff2d4a5485b36e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
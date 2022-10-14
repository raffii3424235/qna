import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD5XnROjkuUUevD5U5Qlo2RsyCYJJuZhQ4",
  authDomain: "anisa-95180.firebaseapp.com",
  projectId: "anisa-95180",
  storageBucket: "anisa-95180.appspot.com",
  messagingSenderId: "813219947471",
  appId: "1:813219947471:web:b9eea848a8ddb6dae9a8ba",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

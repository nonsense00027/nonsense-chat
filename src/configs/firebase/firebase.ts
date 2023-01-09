import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfTR_AqbM5qkJs0-cG-99cTEnr9AgEX6c",
  authDomain: "nonsense-chat.firebaseapp.com",
  projectId: "nonsense-chat",
  storageBucket: "nonsense-chat.appspot.com",
  messagingSenderId: "775903995806",
  appId: "1:775903995806:web:bf1f606c2db362b207588f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();
export { app, auth, storage, db };

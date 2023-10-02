import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAR9HR3-jS8i0L6A4VJoRDUyLBYgFRN-SY",
  authDomain: "chat-ed098.firebaseapp.com",
  projectId: "chat-ed098",
  storageBucket: "chat-ed098.appspot.com",
  messagingSenderId: "883001986510",
  appId: "1:883001986510:web:6c6a6a22ab97a0c7352f9f"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage= getStorage();
export const db = getFirestore();

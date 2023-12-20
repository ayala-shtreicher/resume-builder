import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
const { VITE_FIREBASE_APY_KEY, VITE_FIREBASE_AUTHDOMAIN, VITE_FIREBASE_PROJECTID, VITE_FIREBASE_STORAGEBUCKET, VITE_FIREBASE_MESSAGINGSENDERID, VITE_FIREBASE_APPID, VITE_FIREBASE_MEASUREMENTID } = import.meta.env
const firebaseConfig = {
  apiKey: VITE_FIREBASE_APY_KEY,
  authDomain: VITE_FIREBASE_AUTHDOMAIN,
  projectId: VITE_FIREBASE_PROJECTID,
  storageBucket: VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGINGSENDERID,
  appId: VITE_FIREBASE_APPID,
  measurementId: VITE_FIREBASE_MEASUREMENTID
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
const analytics = getAnalytics(app);
export const storage = getStorage();
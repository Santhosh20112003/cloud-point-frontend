import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyARcIoxyNN8ZW00-nyn3L0BROwi7k10Da8",
  authDomain: "cloud-point-91562.firebaseapp.com",
  projectId: "cloud-point-91562",
  storageBucket: "cloud-point-91562.appspot.com",
  messagingSenderId: "909578827922",
  appId: "1:909578827922:web:b2eabfc052478650144e4b",
  measurementId: "G-2QJSPMSXW1"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;
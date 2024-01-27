import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDBrFKcfDhlwlELkUQ49esegMSAMOMteUc",
  authDomain: "cloud-point2.firebaseapp.com",
  projectId: "cloud-point2",
  storageBucket: "cloud-point2.appspot.com",
  messagingSenderId: "801146514820",
  appId: "1:801146514820:web:be99cbad70f841eab5c1d1",
  measurementId: "G-NQ9SQYKD93"
};



const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;
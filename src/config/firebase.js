import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCIq3fHBbqGF2JAYIXGudoszrjcCY1Inkg",
  authDomain: "cloud-point-2edf0.firebaseapp.com",
  projectId: "cloud-point-2edf0",
  storageBucket: "cloud-point-2edf0.appspot.com",
  messagingSenderId: "567073365658",
  appId: "1:567073365658:web:c001bf7356b2c83ac54923",
  measurementId: "G-7GQ2WM66NR"
};



const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app;
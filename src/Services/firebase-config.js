// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcg-640N2PMKEVk9RWvPcmxWwzihgKgno",
  authDomain: "trello-clone-ddb73.firebaseapp.com",
  projectId: "trello-clone-ddb73",
  storageBucket: "trello-clone-ddb73.appspot.com",
  messagingSenderId: "654791016364",
  appId: "1:654791016364:web:8251d4bb3f2de2878e8409",
  measurementId: "G-Y77690RZ0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

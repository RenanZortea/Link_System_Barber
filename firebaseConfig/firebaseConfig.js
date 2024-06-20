// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs978w6GhTCKF4LcFtIPhqT_CpqgiGJTs",
  authDomain: "linkbarber-74230.firebaseapp.com",
  projectId: "linkbarber-74230",
  storageBucket: "linkbarber-74230.appspot.com",
  messagingSenderId: "210034299130",
  appId: "1:210034299130:web:a2430dccebb16022173943"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
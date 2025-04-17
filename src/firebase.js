import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// La tua configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCuwfOOAU1GkIDBSFZbJ_q5BXqoORDRRrM",
  authDomain: "ecotracker-20cfb.firebaseapp.com",
  projectId: "ecotracker-20cfb",
  storageBucket: "ecotracker-20cfb.appspot.com",
  messagingSenderId: "311477764700",
  appId: "1:311477764700:web:8ac93af697de2dda521c99",
  measurementId: "G-VJBE6C21Y3"
};

// Inizializzazione di Firebase
const app = initializeApp(firebaseConfig);

// Servizi Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

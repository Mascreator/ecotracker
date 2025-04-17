// Importa le funzioni necessarie dai SDK di Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Per gestire l'autenticazione
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Per interagire con Firestore
import { getStorage } from "firebase/storage"; // Per interagire con Firebase Storage

// La tua configurazione di Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCuwfOOAU1GkIDBSFZbJ_q5BXqoORDRRrM",
  authDomain: "ecotracker-20cfb.firebaseapp.com",
  projectId: "ecotracker-20cfb",
  storageBucket: "ecotracker-20cfb.firebasestorage.app",
  messagingSenderId: "311477764700",
  appId: "1:311477764700:web:8ac93af697de2dda521c99",
  measurementId: "G-VJBE6C21Y3"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Ottieni i moduli di autenticazione, Firestore e Storage
const auth = getAuth(app);  // Autenticazione
const db = getFirestore(app);  // Firestore
const storage = getStorage(app);  // Firebase Storage

// Esporta i moduli per usarli nel tuo codice
export { auth, db, storage, createUserWithEmailAndPassword, signInWithEmailAndPassword, addDoc, collection };

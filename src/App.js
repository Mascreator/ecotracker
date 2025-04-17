import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, addDoc, collection } from './firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [localita, setLocalita] = useState('');
  const [tipo, setTipo] = useState('');  // "Pesci", "Insetti", "Uccelli"
  const [data, setData] = useState(new Date());

  // Funzione per registrarsi
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Registrazione riuscita!');
    } catch (error) {
      console.error('Errore nella registrazione:', error.message);
    }
  };

  // Funzione per accedere
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      console.log('Accesso riuscito!');
    } catch (error) {
      console.error('Errore nell\'accesso:', error.message);
    }
  };

  // Funzione per caricare una foto su Firebase Storage
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // Funzione per salvare i dati su Firestore
  const handleSaveData = async () => {
    if (photo) {
      // Carica la foto su Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `segnalazioni/${photo.name}`);
      const uploadTask = uploadBytesResumable(storageRef, photo);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Monitoraggio stato del caricamento
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Caricamento in corso:', progress, '%');
        },
        (error) => {
          console.error('Errore nel caricamento della foto:', error);
        },
        () => {
          // Una volta che la foto è stata caricata, ottieni l'URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // Salva i dati in Firestore
            try {
              const docRef = await addDoc(collection(db, "segnalazioni"), {
                tipo: tipo, // Pesci, Insetti, Uccelli
                localita: localita,
                data: data,
                photoURL: downloadURL,
                email: email, // L'email dell'utente
              });
              console.log('Dati salvati su Firestore:', docRef.id);
            } catch (error) {
              console.error('Errore nel salvataggio dei dati:', error);
            }
          });
        }
      );
    } else {
      alert("Seleziona una foto per continuare");
    }
  };

  return (
    <div>
      <h1>EcoTracker 🌿</h1>
      
      {!isLoggedIn ? (
        <div>
          <h2>Registrati o Accedi</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Registrati</button>
          <button onClick={handleLogin}>Accedi</button>
        </div>
      ) : (
        <div>
          <h2>Salva una segnalazione</h2>
          <div>
            <label>Tipo di segnalazione:</label>
            <select onChange={(e) => setTipo(e.target.value)} value={tipo}>
              <option value="Pesci">Pesci</option>
              <option value="Insetti">Insetti</option>
              <option value="Uccelli">Uccelli</option>
            </select>
          </div>

          <div>
            <label>Località:</label>
            <input
              type="text"
              placeholder="Inserisci la località"
              value={localita}
              onChange={(e) => setLocalita(e.target.value)}
            />
          </div>

          <div>
            <label>Carica una foto:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button onClick={handleSaveData}>Salva Segnalazione</button>
        </div>
      )}
    </div>
  );
}

export default App;

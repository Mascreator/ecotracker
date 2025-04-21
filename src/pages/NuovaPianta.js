// src/pages/NuovaPianta.js
import React, { useState, useEffect } from "react";
import { storage, db, auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

const NuovaPianta = () => {
  const [nomePianta, setNomePianta] = useState("");
  const [foto, setFoto] = useState(null);
  const [data, setData] = useState("");
  const [localizzazione, setLocalizzazione] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [gallery, setGallery] = useState([]);

  // 1) Ottieni la galleria dell'utente
  useEffect(() => {
    const loadGallery = async () => {
      const user = auth.currentUser;
      if (!user) return;
      // Query: nuove-piante dove uid == user.uid, ordinate per createdAt desc
      const q = query(
        collection(db, "nuove-piante"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          fotoURL: data.fotoURL,
          createdAt: data.createdAt.toDate()
        };
      });
      setGallery(items);
    };

    loadGallery();
  }, []);

  const ottieniGeolocalizzazione = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        posizione => {
          const coords = `${posizione.coords.latitude}, ${posizione.coords.longitude}`;
          setLocalizzazione(coords);
        },
        errore => {
          console.error("Errore geolocalizzazione:", errore);
          setMessaggio("Errore durante l'acquisizione della posizione.");
        }
      );
    } else {
      setMessaggio("Geolocalizzazione non supportata dal browser.");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!nomePianta || !foto || !data || !localizzazione) {
      setMessaggio("⚠️ Compilare tutti i campi richiesti.");
      return;
    }

    try {
      setMessaggio("⏳ Caricamento in corso...");

      // 1. Carica immagine su Firebase Storage
      const storageRef = ref(storage, `piante/${Date.now()}_${foto.name}`);
      await uploadBytes(storageRef, foto);
      const urlImmagine = await getDownloadURL(storageRef);

      // 2. Salva i dati su Firestore con uid e timestamp
      const user = auth.currentUser;
      await addDoc(collection(db, "nuove-piante"), {
        uid: user.uid,
        nome: nomePianta,
        fotoURL: urlImmagine,
        data,
        posizione: localizzazione,
        createdAt: serverTimestamp()
      });

      setMessaggio("✅ Caricato correttamente!");

      // Reset dei campi
      setNomePianta("");
      setFoto(null);
      setData("");
      setLocalizzazione("");

      // Ricarica la gallery
      const snapshot = await getDocs(
        query(
          collection(db, "nuove-piante"),
          where("uid", "==", user.uid),
          orderBy("createdAt", "desc")
        )
      );
      const items = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          fotoURL: d.fotoURL,
          createdAt: d.createdAt.toDate()
        };
      });
      setGallery(items);

      setTimeout(() => setMessaggio(""), 2000);
    } catch (error) {
      console.error("Errore durante il caricamento:", error);
      setMessaggio("❌ Errore durante il caricamento.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ maxWidth: "400px", margin: "0 auto", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", color: "#2c3e50" }}>🌱 Nuova Pianta</h2>

        {messaggio && (
          <div
            style={{
              marginBottom: "15px",
              color: messaggio.includes("✅")
                ? "green"
                : messaggio.includes("⚠️")
                ? "#e67e22"
                : "red",
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            {messaggio}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Nome della pianta:</label>
            <input
              type="text"
              value={nomePianta}
              onChange={e => setNomePianta(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Carica una foto:</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => setFoto(e.target.files[0])}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Data:</label>
            <input
              type="date"
              value={data}
              onChange={e => setData(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Localizzazione GPS:</label>
            <input
              type="text"
              value={localizzazione}
              readOnly
              placeholder="Clicca per ottenere la posizione"
              style={{ width: "100%", padding: "8px" }}
            />
            <button
              type="button"
              onClick={ottieniGeolocalizzazione}
              style={{
                marginTop: "5px",
                width: "100%",
                padding: "10px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              📍 Ottieni Posizione
            </button>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#27ae60",
              color: "white",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Invia Segnalazione
          </button>
        </form>
      </div>

      {/* Il mio erbario digitale */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h3>Il mio erbario digitale</h3>
        {gallery.length === 0 ? (
          <p>Esplora, fotografa, conserva</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px" }}>
            {gallery.map(item => (
              <div key={item.id} style={{ width: "120px" }}>
                <img
                  src={item.fotoURL}
                  alt="pianta"
                  style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                />
                <p style={{ fontSize: "12px", color: "#555" }}>
                  {item.createdAt.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NuovaPianta;

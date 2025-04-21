import React, { useState, useEffect } from "react";
import { storage, db, auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const categories = [
  { label: "🐟 Pesci", key: "pesci" },
  { label: "🐦 Uccelli", key: "uccelli" },
  { label: "🐜 Insetti", key: "insetti" },
  { label: "🐍 Rettili", key: "rettili" }
];

const Segnalazioni = () => {
  const [selectedCategory, setSelectedCategory] = useState("pesci");
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [gallery, setGallery] = useState([]);

  // Carica gli avvistamenti dell'utente
  useEffect(() => {
    const loadGallery = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const q = query(
        collection(db, "segnalazioni"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setGallery(snap.docs.map(d => {
        const data = d.data();
        return { id: d.id, fotoURL: data.fotoURL, createdAt: data.createdAt.toDate() };
      }));
    };
    loadGallery();
  }, []);

  const handlePhotoChange = e => {
    setPhoto(e.target.files[0]);
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => alert("Errore nel recupero della posizione.")
      );
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!photo || !location || !date) {
      setStatus("❌ Compila tutti i campi richiesti");
      return;
    }
    setStatus("⏳ Invio in corso...");
    try {
      // 1. Upload foto
      const storageRef = ref(storage, `segnalazioni/${Date.now()}_${photo.name}`);
      await uploadBytes(storageRef, photo);
      const fotoURL = await getDownloadURL(storageRef);

      // 2. Salva Firestore
      const user = auth.currentUser;
      await addDoc(collection(db, "segnalazioni"), {
        uid: user.uid,
        categoria: selectedCategory,
        data: date,
        posizione: location,
        fotoURL,
        createdAt: serverTimestamp()
      });

      setStatus("✅ Segnalazione inviata correttamente!");
      setPhoto(null);
      setLocation(null);
      setDate("");

      // ricarica gallery
      const q = query(
        collection(db, "segnalazioni"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setGallery(snap.docs.map(d => {
        const data = d.data();
        return { id: d.id, fotoURL: data.fotoURL, createdAt: data.createdAt.toDate() };
      }));
    } catch (err) {
      console.error(err);
      setStatus("❌ Errore durante l'invio");
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#ecf0f1", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center" }}>Segnalazioni</h2>

      {/* form di invio */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            style={{
              padding: "10px 15px",
              backgroundColor: selectedCategory === cat.key ? "#27ae60" : "#bdc3c7",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "500px",
          margin: "0 auto",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}
      >
        <div style={{ marginBottom: "15px" }}>
          <label>Foto:</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} required />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Data:</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            style={{ marginLeft: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <button
            type="button"
            onClick={handleLocation}
            style={{
              padding: "8px 15px",
              backgroundColor: "#2980b9",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Ottieni posizione
          </button>
          {location && (
            <p style={{ marginTop: "10px" }}>
              Lat: {location.latitude.toFixed(5)} <br />
              Lon: {location.longitude.toFixed(5)}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#27ae60",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Invia segnalazione
        </button>
      </form>

      {/* I miei avvistamenti */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h3>I miei avvistamenti</h3>
        {gallery.length === 0 ? (
          <p>Esplora, fotografa, conserva</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
            {gallery.map(item => (
              <div key={item.id} style={{ width: "120px" }}>
                <img
                  src={item.fotoURL}
                  alt="avvistamento"
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

      {status && <p style={{ textAlign: "center", marginTop: "15px" }}>{status}</p>}
    </div>
  );
};

export default Segnalazioni;

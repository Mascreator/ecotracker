import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const categories = [
  { label: "🐟 Pesci", key: "pesci" },
  { label: "🐦 Uccelli", key: "uccelli" },
  { label: "🐜 Insetti", key: "insetti" },
  { label: "🐍 Rettili", key: "rettili" },
];

const Segnalazioni = () => {
  const [selectedCategory, setSelectedCategory] = useState("pesci");
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        () => {
          alert("Errore nel recupero della posizione.");
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo || !location || !date) {
      setStatus("❌ Compila tutti i campi richiesti");
      return;
    }
    setStatus("⏳ Invio in corso...");
    try {
      await addDoc(collection(db, "segnalazioni"), {
        categoria: selectedCategory,
        data: date,
        posizione: location,
        fotoNome: photo.name,
        createdAt: new Date(),
      });
      setStatus("✅ Segnalazione inviata correttamente!");
      // reset form
      setPhoto(null);
      setLocation(null);
      setDate("");
    } catch (err) {
      console.error(err);
      setStatus("❌ Errore durante l'invio");
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#ecf0f1", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center" }}>Segnalazioni</h2>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
        {categories.map((cat) => (
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
              fontWeight: "bold",
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
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
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
            onChange={(e) => setDate(e.target.value)}
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
              cursor: "pointer",
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
            fontWeight: "bold",
          }}
        >
          Invia segnalazione
        </button>
      </form>
      {status && <p style={{ textAlign: "center", marginTop: "15px" }}>{status}</p>}
    </div>
  );
};

export default Segnalazioni;

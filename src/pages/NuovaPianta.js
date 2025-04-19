// src/pages/NuovaPianta.js
import React, { useState } from "react";

const NuovaPianta = () => {
  const [nomePianta, setNomePianta] = useState("");
  const [foto, setFoto] = useState(null);
  const [data, setData] = useState("");
  const [localizzazione, setLocalizzazione] = useState("");
  const [messaggio, setMessaggio] = useState("");

  const ottieniGeolocalizzazione = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (posizione) => {
          const coords = `${posizione.coords.latitude}, ${posizione.coords.longitude}`;
          setLocalizzazione(coords);
        },
        (errore) => {
          console.error("Errore geolocalizzazione:", errore);
          setMessaggio("Errore durante l'acquisizione della posizione.");
        }
      );
    } else {
      setMessaggio("Geolocalizzazione non supportata dal browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nomePianta || !foto || !data || !localizzazione) {
      setMessaggio("⚠️ Compilare tutti i campi richiesti.");
      return;
    }

    try {
      console.log({
        nomePianta,
        foto,
        data,
        localizzazione,
      });

      setMessaggio("✅ Caricato correttamente!");

      // Reset dei campi
      setNomePianta("");
      setFoto(null);
      setData("");
      setLocalizzazione("");

      // Refresh dopo 2 secondi
      setTimeout(() => setMessaggio(""), 2000);
    } catch (error) {
      console.error("Errore durante il caricamento:", error);
      setMessaggio("❌ Errore durante il caricamento.");
    }
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
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
              textAlign: "center",
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
              onChange={(e) => setNomePianta(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Carica una foto:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files[0])}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Data:</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
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
                cursor: "pointer",
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
              cursor: "pointer",
            }}
          >
            Invia Segnalazione
          </button>
        </form>
      </div>
    </div>
  );
};

export default NuovaPianta;

import React, { useState } from "react";

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
        (err) => {
          alert("Errore nel recupero della posizione.");
        }
      );
    } else {
      alert("Geolocalizzazione non supportata dal browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      categoria: selectedCategory,
      foto: photo,
      posizione: location,
      data: date,
    });
    alert("Segnalazione inviata!");
    setPhoto(null);
    setLocation(null);
    setDate("");
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#ecf0f1", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center" }}>Segnalazioni</h2>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            style={{
              padding: "10px 15px",
              margin: "5px",
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
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Data:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
    </div>
  );
};

export default Segnalazioni;

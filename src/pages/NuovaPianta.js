import React, { useState } from 'react';

function NuovaPianta() {
  const [nome, setNome] = useState('');
  const [immagine, setImmagine] = useState(null);
  const [posizione, setPosizione] = useState(null);
  const [data, setData] = useState(new Date().toLocaleDateString());

  const prendiPosizione = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setPosizione({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
      });
    } else {
      alert("Geolocalizzazione non supportata dal browser.");
    }
  };

  const salvaPianta = () => {
    console.log("Nome:", nome);
    console.log("Immagine:", immagine);
    console.log("Posizione:", posizione);
    console.log("Data:", data);
    alert("Pianta salvata (in console per ora)!");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Aggiungi una nuova pianta 🌱</h2>
      <input
        type="text"
        placeholder="Nome della pianta"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImmagine(e.target.files[0])}
        style={{ display: 'block', marginBottom: '10px' }}
      />

      <button onClick={prendiPosizione} style={{ marginBottom: '10px' }}>
        📍 Prendi la posizione
      </button>

      {posizione && (
        <div>
          <p>Latitudine: {posizione.lat}</p>
          <p>Longitudine: {posizione.lon}</p>
        </div>
      )}

      <p>Data: {data}</p>

      <button onClick={salvaPianta} style={{ marginTop: '10px' }}>💾 Salva Pianta</button>
    </div>
  );
}

export default NuovaPianta;

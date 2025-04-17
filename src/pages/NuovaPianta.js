// src/pages/NuovaPianta.js
import React, { useState } from "react";

const NuovaPianta = () => {
  const [nomePianta, setNomePianta] = useState("");
  const [foto, setFoto] = useState(null);
  const [data, setData] = useState("");
  const [localizzazione, setLocalizzazione] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logica per gestire l'inserimento della nuova pianta
    console.log({
      nomePianta,
      foto,
      data,
      localizzazione,
    });
  };

  return (
    <div>
      <h1>Nuova Pianta</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome della pianta:</label>
          <input
            type="text"
            value={nomePianta}
            onChange={(e) => setNomePianta(e.target.value)}
          />
        </div>
        <div>
          <label>Carica una foto:</label>
          <input
            type="file"
            onChange={(e) => setFoto(e.target.files[0])}
          />
        </div>
        <div>
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <div>
          <label>Localizzazione GPS:</label>
          <input
            type="text"
            value={localizzazione}
            onChange={(e) => setLocalizzazione(e.target.value)}
          />
        </div>
        <button type="submit">Salva</button>
      </form>
    </div>
  );
};

export default NuovaPianta;

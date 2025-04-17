import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Sottocategoria = () => {
  const { tipo } = useParams();
  const [foto, setFoto] = useState(null);
  const [data, setData] = useState('');
  const [localizzazione, setLocalizzazione] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Segnalazione salvata per ${tipo} (da collegare a Firestore)`);
  };

  return (
    <div>
      <h3>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Foto:
          <input type="file" onChange={(e) => setFoto(e.target.files[0])} />
        </label>
        <label>
          Data:
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        </label>
        <label>
          Localizzazione:
          <input
            type="text"
            placeholder="Inserisci località"
            value={localizzazione}
            onChange={(e) => setLocalizzazione(e.target.value)}
          />
        </label>
        <button type="submit">Salva</button>
      </form>
    </div>
  );
};

export default Sottocategoria;

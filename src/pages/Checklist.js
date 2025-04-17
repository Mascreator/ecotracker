// src/pages/Checklist.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const nativeSpecies = [
  'Quercus robur',
  'Fagus sylvatica',
  'Pinus sylvestris'
];

const alienSpecies = [
  'Ailanthus altissima',
  'Robinia pseudoacacia',
  'Ambrosia artemisiifolia'
];

const Checklist = () => {
  const [nativeChecks, setNativeChecks] = useState(
    nativeSpecies.reduce((acc, s) => ({ ...acc, [s]: false }), {})
  );
  const [alienChecks, setAlienChecks] = useState(
    alienSpecies.reduce((acc, s) => ({ ...acc, [s]: false }), {})
  );
  const [status, setStatus] = useState('');

  const toggleNative = (specie) => {
    setNativeChecks(prev => ({ ...prev, [specie]: !prev[specie] }));
  };

  const toggleAlien = (specie) => {
    setAlienChecks(prev => ({ ...prev, [specie]: !prev[specie] }));
  };

  const handleSave = async () => {
    setStatus('Salvataggio in corso…');
    const selectedNative = Object.keys(nativeChecks).filter(s => nativeChecks[s]);
    const selectedAlien  = Object.keys(alienChecks).filter(s => alienChecks[s]);
    try {
      await addDoc(collection(db, 'checklists'), {
        nativeChecked: selectedNative,
        alienChecked: selectedAlien,
        createdAt: new Date()
      });
      setStatus('Checklist salvata con successo!');
    } catch (err) {
      console.error(err);
      setStatus('Errore nel salvataggio.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checklist ✅</h1>

      <section style={styles.section}>
        <h2>Specie Native</h2>
        {nativeSpecies.map(s => (
          <label key={s} style={styles.label}>
            <input
              type="checkbox"
              checked={nativeChecks[s]}
              onChange={() => toggleNative(s)}
            />{' '}
            {s}
          </label>
        ))}
      </section>

      <section style={styles.section}>
        <h2>Specie Aliene</h2>
        {alienSpecies.map(s => (
          <label key={s} style={styles.label}>
            <input
              type="checkbox"
              checked={alienChecks[s]}
              onChange={() => toggleAlien(s)}
            />{' '}
            {s}
          </label>
        ))}
      </section>

      <button onClick={handleSave} style={styles.button}>
        Salva Checklist
      </button>
      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: 'white',
    minHeight: '100vh',
    boxSizing: 'border-box'
  },
  title: {
    color: '#2ecc71',
    textAlign: 'center',
    marginBottom: '20px'
  },
  section: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '16px',
    margin: '8px 0',
    color: '#333'
  },
  button: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    display: 'block',
    margin: '0 auto'
  },
  status: {
    textAlign: 'center',
    marginTop: '10px'
  }
};

export default Checklist;

// src/pages/Checklist.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const nativeSpecies = [
  { name: 'Quercus robur', img: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Quercus_robur_%28a%29.jpg' },
  { name: 'Fagus sylvatica', img: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Fagus_sylvatica_001.JPG' },
  { name: 'Pinus sylvestris', img: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Pinus_sylvestris_tree.jpg' }
];

const alienSpecies = [
  { name: 'Ailanthus altissima', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Ailanthus_altissima1.jpg' },
  { name: 'Robinia pseudoacacia', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Robinia_pseudoacacia1.jpg' },
  { name: 'Ambrosia artemisiifolia', img: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Ambrosia_artemisiifolia.jpg' }
];

const Checklist = () => {
  const [nativeChecks, setNativeChecks] = useState({});
  const [alienChecks, setAlienChecks] = useState({});
  const [status, setStatus] = useState('');

  const toggleCheck = (specie, isNative) => {
    if (isNative) {
      setNativeChecks(prev => ({ ...prev, [specie]: !prev[specie] }));
    } else {
      setAlienChecks(prev => ({ ...prev, [specie]: !prev[specie] }));
    }
  };

  const handleSave = async () => {
    setStatus('');
    const selectedNative = Object.keys(nativeChecks).filter(s => nativeChecks[s]);
    const selectedAlien = Object.keys(alienChecks).filter(s => alienChecks[s]);

    if (selectedNative.length === 0 && selectedAlien.length === 0) {
      setStatus('⚠️ Compilare almeno una specie.');
      return;
    }

    try {
      await addDoc(collection(db, 'checklists'), {
        nativeChecked: selectedNative,
        alienChecked: selectedAlien,
        createdAt: new Date()
      });
      setStatus('✅ Caricato correttamente.');
      setNativeChecks({});
      setAlienChecks({});
    } catch (err) {
      console.error(err);
      setStatus('❌ Errore durante il caricamento.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checklist ✅</h1>

      <section style={styles.section}>
        <h2>🌿 Specie Native</h2>
        <div style={styles.grid}>
          {nativeSpecies.map(({ name, img }) => (
            <div key={name} style={styles.card}>
              <img src={img} alt={name} style={styles.image} />
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={!!nativeChecks[name]}
                  onChange={() => toggleCheck(name, true)}
                />{' '}
                {name}
              </label>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2>🌱 Specie Aliene</h2>
        <div style={styles.grid}>
          {alienSpecies.map(({ name, img }) => (
            <div key={name} style={styles.card}>
              <img src={img} alt={name} style={styles.image} />
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={!!alienChecks[name]}
                  onChange={() => toggleCheck(name, false)}
                />{' '}
                {name}
              </label>
            </div>
          ))}
        </div>
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
    backgroundColor: '#fff',
    minHeight: '100vh',
    boxSizing: 'border-box'
  },
  title: {
    textAlign: 'center',
    color: '#2ecc71',
    marginBottom: '20px'
  },
  section: {
    marginBottom: '30px'
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'center'
  },
  card: {
    width: '150px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '8px'
  },
  label: {
    fontSize: '14px',
    color: '#333'
  },
  button: {
    backgroundColor: '#27ae60',
    color: '#fff',
    padding: '12px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'block',
    margin: '0 auto'
  },
  status: {
    textAlign: 'center',
    marginTop: '15px',
    color: '#27ae60',
    fontWeight: 'bold'
  }
};

export default Checklist;
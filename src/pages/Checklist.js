import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

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
  const [gallery, setGallery] = useState([]);

  // Carica le checklist dell’utente
  useEffect(() => {
    const loadGallery = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const q = query(
        collection(db, 'checklists'),
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      // flatten: un item per specie
      const items = [];
      snap.docs.forEach(doc => {
        const data = doc.data();
        const date = data.createdAt.toDate();
        data.nativeChecked.forEach(name => {
          const img = nativeSpecies.find(s => s.name === name)?.img;
          items.push({ id: doc.id + name, name, img, date });
        });
        data.alienChecked.forEach(name => {
          const img = alienSpecies.find(s => s.name === name)?.img;
          items.push({ id: doc.id + name, name, img, date });
        });
      });
      setGallery(items);
    };
    loadGallery();
  }, []);

  const toggleCheck = (specie, isNative) => {
    if (isNative) setNativeChecks(prev => ({ ...prev, [specie]: !prev[specie] }));
    else setAlienChecks(prev => ({ ...prev, [specie]: !prev[specie] }));
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
      const user = auth.currentUser;
      await addDoc(collection(db, 'checklists'), {
        uid: user.uid,
        nativeChecked: selectedNative,
        alienChecked: selectedAlien,
        createdAt: serverTimestamp()
      });
      setStatus('✅ Caricato correttamente.');
      setNativeChecks({});
      setAlienChecks({});

      // ricarica gallery
      const q = query(
        collection(db, 'checklists'),
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const snap = await getDocs(q);
      const items = [];
      snap.docs.forEach(doc => {
        const data = doc.data();
        const date = data.createdAt.toDate();
        data.nativeChecked.forEach(name => {
          const img = nativeSpecies.find(s => s.name === name)?.img;
          items.push({ id: doc.id + name, name, img, date });
        });
        data.alienChecked.forEach(name => {
          const img = alienSpecies.find(s => s.name === name)?.img;
          items.push({ id: doc.id + name, name, img, date });
        });
      });
      setGallery(items);
    } catch (err) {
      console.error(err);
      setStatus('❌ Errore durante il caricamento.');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', minHeight: '100vh', boxSizing: 'border-box' }}>
      <h1 style={{ textAlign: 'center', color: '#2ecc71', marginBottom: '20px' }}>Checklist ✅</h1>

      <section style={{ marginBottom: '30px' }}>
        <h2>🌿 Specie Native</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          {nativeSpecies.map(({ name, img }) => (
            <div key={name} style={{ width: '150px', border: '1px solid #ddd', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
              <img src={img} alt={name} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }} />
              <label style={{ fontSize: '14px', color: '#333' }}>
                <input type="checkbox" checked={!!nativeChecks[name]} onChange={() => toggleCheck(name, true)} /> {name}
              </label>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>🌱 Specie Aliene</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          {alienSpecies.map(({ name, img }) => (
            <div key={name} style={{ width: '150px', border: '1px solid #ddd', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
              <img src={img} alt={name} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }} />
              <label style={{ fontSize: '14px', color: '#333' }}>
                <input type="checkbox" checked={!!alienChecks[name]} onChange={() => toggleCheck(name, false)} /> {name}
              </label>
            </div>
          ))}
        </div>
      </section>

      <button onClick={handleSave} style={{ backgroundColor: '#27ae60', color: '#fff', padding: '12px 20px', fontSize: '16px', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'block', margin: '0 auto' }}>
        Salva Checklist
      </button>
      {status && <p style={{ textAlign: 'center', marginTop: '15px', color: status.startsWith('✅') ? 'green' : 'red', fontWeight: 'bold' }}>{status}</p>}

      {/* Specie trovate */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <h3>Specie trovate</h3>
        {gallery.length === 0 ? (
          <p>Esplora, fotografa, conserva</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
            {gallery.map(item => (
              <div key={item.id} style={{ width: '120px' }}>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                <p style={{ fontSize: '12px', color: '#555' }}>{item.date.toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Checklist;

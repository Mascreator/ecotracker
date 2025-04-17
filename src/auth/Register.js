import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Assicurati che il percorso sia corretto
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login'); // Dopo la registrazione, reindirizza alla pagina di login
    } catch (error) {
      console.error("Errore di registrazione:", error.message);
      setError(error.message); // Mostra l'errore se qualcosa va storto
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Registrati</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleRegister} style={{ display: 'inline-block', textAlign: 'left' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ padding: '10px', margin: '10px 0', width: '200px' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ padding: '10px', margin: '10px 0', width: '200px' }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '10px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Registrati
        </button>
      </form>
    </div>
  );
};

export default Register;

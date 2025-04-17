import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase'; // Assicurati che il percorso sia corretto
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) return <div>Loading...</div>; // Mostra un loader mentre controlli lo stato dell'autenticazione

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

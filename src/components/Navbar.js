// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(undefined);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    signOut(auth).catch((err) => console.error(err));
  };

  const toggleMenu = () => setIsMenuOpen((open) => !open);

  // Durante il caricamento dello stato auth non mostriamo nulla
  if (user === undefined) return null;

  return (
    <nav style={{ backgroundColor: '#27ae60', padding: '10px', color: 'white', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo sempre visibile, manda a home se loggato */}
        <Link to={user ? '/home' : '/'} style={{ color: 'white', textDecoration: 'none' }}>
          <h2>EcoTracker</h2>
        </Link>

        {/* Menu desktop */}
        <div className="desktop-nav">
          {user ? (
            <>
              <Link to="/home" style={linkStyle}>🏠 Home</Link>
              <Link to="/nuova-pianta" style={linkStyle}>🌱 Nuova Pianta</Link>
              <Link to="/segnalazioni" style={linkStyle}>📋 Segnalazioni</Link>
              <Link to="/checklist" style={linkStyle}>✅ Checklist</Link>
              <button onClick={handleLogout} style={logoutStyle}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/" style={linkStyle}>Login</Link>
              <Link to="/register" style={linkStyle}>Registrati</Link>
            </>
          )}
        </div>

        {/* Hamburger button */}
        <button onClick={toggleMenu} style={hamburgerStyle}>☰</button>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div style={mobileMenuStyle}>
            {user ? (
              <>
                <Link to="/home" style={mobileLink}>🏠 Home</Link>
                <Link to="/nuova-pianta" style={mobileLink}>🌱 Nuova Pianta</Link>
                <Link to="/segnalazioni" style={mobileLink}>📋 Segnalazioni</Link>
                <Link to="/checklist" style={mobileLink}>✅ Checklist</Link>
                <button onClick={handleLogout} style={mobileLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/" style={mobileLink}>Login</Link>
                <Link to="/register" style={mobileLink}>Registrati</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

// Stili riutilizzabili
const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  marginRight: '15px',
};

const logoutStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  cursor: 'pointer',
};

const hamburgerStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  fontSize: '24px',
  cursor: 'pointer',
};

const mobileMenuStyle = {
  position: 'absolute',
  top: '60px',
  right: '0',
  backgroundColor: '#27ae60',
  width: '200px',
  padding: '10px',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
};

const mobileLink = {
  color: 'white',
  textDecoration: 'none',
  marginBottom: '10px',
};

const mobileLogout = {
  ...logoutStyle,
  marginTop: '10px',
};

export default Navbar;

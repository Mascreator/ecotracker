import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).catch((error) => console.error(error.message));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={{ backgroundColor: '#27ae60', padding: '10px', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>
            <h2>EcoTracker</h2>
          </Link>
        </div>

        <div className="desktop-nav">
          {user ? (
            <>
              <Link to="/home" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
                🏠 Home
              </Link>
              <Link to="/nuova-pianta" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
                🌱 Nuova Pianta
              </Link>
              <Link to="/segnalazioni" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
                📋 Segnalazioni
              </Link>
              <Link to="/checklist" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
                ✅ Checklist
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>
                Login
              </Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                Registrati
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <div className="mobile-nav">
          <button
            onClick={toggleMenu}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            ☰
          </button>
          {isMenuOpen && (
            <div
              style={{
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
              }}
            >
              {user ? (
                <>
                  <Link to="/home" style={{ color: 'white', marginBottom: '10px' }}>🏠 Home</Link>
                  <Link to="/nuova-pianta" style={{ color: 'white', marginBottom: '10px' }}>🌱 Nuova Pianta</Link>
                  <Link to="/segnalazioni" style={{ color: 'white', marginBottom: '10px' }}>📋 Segnalazioni</Link>
                  <Link to="/checklist" style={{ color: 'white', marginBottom: '10px' }}>✅ Checklist</Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/" style={{ color: 'white', marginBottom: '10px' }}>Login</Link>
                  <Link to="/register" style={{ color: 'white' }}>Registrati</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

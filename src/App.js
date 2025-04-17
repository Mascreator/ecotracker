// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import NuovaPianta from "./pages/NuovaPianta"; // modificato il nome per rispecchiare il file corretto
import Segnalazioni from "./pages/Segnalazioni"; // modificato il nome per rispecchiare il file corretto
import Checklist from "./pages/Checklist";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nuova-pianta"
          element={
            <ProtectedRoute>
              <NuovaPianta />
            </ProtectedRoute>
          }
        />
        <Route
          path="/segnalazioni"
          element={
            <ProtectedRoute>
              <Segnalazioni />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checklist"
          element={
            <ProtectedRoute>
              <Checklist />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

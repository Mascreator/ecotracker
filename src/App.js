import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import NuovaPianta from "./pages/NuovaPianta";
import Segnalazioni from "./pages/Segnalazioni";
import Checklist from "./pages/Checklist";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import AreaDetails from "./pages/AreaDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* rotte pubbliche */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* rotte protette, tutte sotto lo stesso path "/*" */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              {/* Navbar visibile solo dopo il login */}
              <Navbar />
              <Routes>
                <Route path="home" element={<Home />} />
                <Route path="nuova-pianta" element={<NuovaPianta />} />
                <Route path="segnalazioni" element={<Segnalazioni />} />
                <Route path="checklist" element={<Checklist />} />
                <Route path="area/:name" element={<AreaDetails />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

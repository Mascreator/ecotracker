import React from "react";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <div style={{ backgroundColor: "#f1c40f", minHeight: "100vh", paddingTop: "60px" }}>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <img
          src={logo}
          alt="Ecotracker Logo"
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <h1 style={{ color: "#2c3e50", maxWidth: "90%", margin: "0 auto" }}>
          Le aree protette sono fondamentali, per questo Nesos grazie al progetto InFEA
          vi porterà alla scoperta di questo magico mondo.
        </h1>
      </div>
    </div>
  );
};

export default Home;

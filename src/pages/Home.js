// src/pages/Home.js
import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const areeProtette = [
  {
    nome: "Buone pratiche nelle aree protette",
    descrizione:
      "Descrizione delle buone pratiche da seguire per la protezione degli ecosistemi e della biodiversità.",
  },
  {
    nome: "Capo Peloro",
    descrizione:
      "Riserva naturale con paesaggi mozzafiato, habitat costieri e acquatici di grande importanza ecologica.",
  },
  {
    nome: "Laghetti di Marinello",
    descrizione:
      "Zona umida protetta, caratterizzata da laghetti salmastri e un ecosistema ricco di flora e fauna.",
  },
  {
    nome: "Isola di Salina",
    descrizione:
      "Isola di straordinaria biodiversità, parte del patrimonio naturale delle Isole Eolie, riserva marina e terrestre.",
  },
];

const Home = () => {
  const [mostraAree, setMostraAree] = useState(false);
  const [apriDettagli, setApriDettagli] = useState(
    areeProtette.reduce((acc, a) => ({ ...acc, [a.nome]: false }), {})
  );

  return (
    <div
      style={{
        backgroundColor: "#ecf0f1",
        minHeight: "100vh",
        paddingTop: "60px",
      }}
    >
      <div style={{ textAlign: "center", padding: "20px" }}>
        <img
          src={logo}
          alt="Ecotracker Logo"
          style={{ width: "150px", marginBottom: "20px" }}
        />
        <h1
          style={{
            color: "#2c3e50",
            maxWidth: "90%",
            margin: "0 auto",
          }}
        >
          Le aree protette sono fondamentali, per questo Nesos grazie al progetto
          InFEA vi porterà alla scoperta di questo magico mondo.
        </h1>

        <button
          onClick={() => setMostraAree(!mostraAree)}
          style={{
            marginTop: "30px",
            backgroundColor: "#27ae60",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {mostraAree ? "Nascondi le aree protette" : "Scopri le aree protette"}
        </button>

        {mostraAree && (
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {areeProtette.map((area) => (
              <div
                key={area.nome}
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "20px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  maxWidth: "700px",
                  margin: "0 auto",
                  textAlign: "left",
                }}
              >
                <h3
                  style={{
                    color: "#27ae60",
                    marginBottom: "15px",
                    fontSize: "22px",
                  }}
                >
                  {area.nome}
                </h3>

                <button
                  onClick={() =>
                    setApriDettagli((prev) => ({
                      ...prev,
                      [area.nome]: !prev[area.nome],
                    }))
                  }
                  style={{
                    backgroundColor: "#27ae60",
                    color: "white",
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  {apriDettagli[area.nome]
                    ? "Nascondi Dettagli"
                    : "Scopri Dettagli"}
                </button>

                <Link
                  to={`/area/${encodeURIComponent(
                    area.nome.toLowerCase().replace(/ /g, "-")
                  )}`}
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    color: "#2980b9",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  Vai alla pagina completa
                </Link>

                {apriDettagli[area.nome] && (
                  <p
                    style={{
                      color: "#2c3e50",
                      marginTop: "15px",
                      lineHeight: "1.5",
                    }}
                  >
                    {area.descrizione}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

// src/pages/AreaDetails.js
import React from "react";
import { useParams } from "react-router-dom";

const areeProtette = [
  {
    slug: "buone-pratiche-nelle-aree-protette",
    nome: "Buone pratiche nelle aree protette",
    descrizione:
      "Descrizione delle buone pratiche da seguire per la protezione degli ecosistemi e della biodiversità.",
    dettagli:
      "In questa sezione approfondiamo le tecniche di gestione sostenibile, il monitoraggio delle specie e le buone pratiche per ridurre l’impatto umano sulle riserve naturali.",
  },
  {
    slug: "capo-peloro",
    nome: "Capo Peloro",
    descrizione:
      "Riserva naturale con paesaggi mozzafiato, habitat costieri e acquatici di grande importanza ecologica.",
    dettagli:
      "Capo Peloro, a Messina, è un promontorio ricco di biodiversità: qui si incontrano acque dolci e marine, dune costiere e varietà di fauna selvatica.",
  },
  {
    slug: "laghetti-di-marinello",
    nome: "Laghetti di Marinello",
    descrizione:
      "Zona umida protetta, caratterizzata da laghetti salmastri e un ecosistema ricco di flora e fauna.",
    dettagli:
      "I Laghetti di Marinello sono ideali per il birdwatching: rifugio per numerose specie migratorie, con percorsi naturalistici lungo le sponde.",
  },
  {
    slug: "isola-di-salina",
    nome: "Isola di Salina",
    descrizione:
      "Isola di straordinaria biodiversità, parte del patrimonio naturale delle Isole Eolie, riserva marina e terrestre.",
    dettagli:
      "Salina è famosa per i suoi boschi di lecci, vigneti su terrazzamenti e calette marine incontaminate, presidio di specie endemiche.",
  },
];

export default function AreaDetails() {
  const { name: slug } = useParams();

  // Trova l'area corrispondente al "slug" nell'URL
  const area = areeProtette.find((a) => a.slug === slug);

  if (!area) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Area non trovata</h2>
        <p>Controlla di aver selezionato un’area valida.</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#ecf0f1", minHeight: "100vh", paddingTop: "60px" }}>
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#27ae60", marginBottom: "15px", textAlign: "center" }}>
          {area.nome}
        </h2>

        <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>Descrizione</h3>
        <p style={{ color: "#2c3e50", lineHeight: "1.5" }}>{area.descrizione}</p>

        <h3 style={{ color: "#2c3e50", marginBottom: "10px", marginTop: "20px" }}>Dettagli</h3>
        <p style={{ color: "#2c3e50", lineHeight: "1.5" }}>{area.dettagli}</p>
      </div>
    </div>
  );
}

import React from "react";
import { useParams } from "react-router-dom";

const areeProtette = [
  {
    nome: "Isola di Salina (Isole Eolie)",
    descrizione:
      "Area marina e terrestre di straordinaria biodiversità, tutelata per la sua importanza ecologica e paesaggistica.",
    dettagli:
      "L'Isola di Salina è una delle isole Eolie, ed è caratterizzata da una ricca biodiversità marina e terrestre. La zona è protetta e conserva diversi habitat naturali di grande valore ecologico.",
  },
  {
    nome: "Capo Peloro",
    descrizione:
      "Capo Peloro è una riserva naturale situata a Messina, famosa per la sua varietà di flora e fauna, nonché per la sua importanza ecologica.",
    dettagli:
      "Capo Peloro è una zona di grande interesse per gli appassionati di biodiversità e paesaggi naturali. La riserva offre diversi sentieri e punti panoramici per i visitatori.",
  },
  {
    nome: "Laghetti di Marinello",
    descrizione:
      "I Laghetti di Marinello sono un'area naturale protetta che ospita numerose specie di uccelli e piante endemiche, un luogo di grande bellezza naturale.",
    dettagli:
      "I Laghetti di Marinello sono un complesso di zone umide che attirano numerose specie di avifauna. L'area è particolarmente apprezzata per il birdwatching e le attività ecoturistiche.",
  },
  {
    nome: "Isola di Salina (Isole Eolie)",
    descrizione:
      "L'Isola di Salina è una delle isole Eolie, ed è caratterizzata da una ricca biodiversità marina e terrestre.",
    dettagli:
      "L'Isola di Salina ospita diversi ecosistemi protetti e una varietà di piante e animali endemici. È un luogo ideale per il trekking e per esplorare la flora e fauna unica.",
  },
];

const AreaDetails = () => {
  const { name } = useParams();

  // Trova i dettagli dell'area in base al nome estratto dalla URL
  const area = areeProtette.find((area) => area.nome.toLowerCase().replace(/ /g, "-") === name);

  if (!area) {
    return <div>Area non trovata</div>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#ecf0f1", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", color: "#27ae60" }}>{area.nome}</h2>
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <h3>Descrizione</h3>
        <p>{area.descrizione}</p>
        <h3>Dettagli</h3>
        <p>{area.dettagli}</p>
      </div>
    </div>
  );
};

export default AreaDetails;

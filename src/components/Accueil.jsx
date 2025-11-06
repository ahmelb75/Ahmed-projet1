import React, { useEffect, useState } from "react";
import "./Accueil.css";
import { Link, useNavigate } from "react-router-dom";

const STORAGE_KEY = "etapes_projet";

const loadEtapes = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveEtapes = (etapes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(etapes));
};

const Accueil = () => {
  const navigate = useNavigate();
  const [etapes, setEtapes] = useState([]);

  useEffect(() => {
    setEtapes(loadEtapes());
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Supprimer cette étape ?")) return;
    const next = etapes.filter((e) => e.id !== id);
    setEtapes(next);
    saveEtapes(next);
  };

  const handleEdit = (id) => {
    const etape = etapes.find((e) => e.id === id);
    if (!etape) return;
    const nouveauTitre = window.prompt("Modifier le titre :", etape.titre);
    if (nouveauTitre === null) return; 
    const nouvelleDesc = window.prompt(
      "Modifier la description :",
      etape.description
    );
    if (nouvelleDesc === null) return;
    const next = etapes.map((e) =>
      e.id === id ? { ...e, titre: nouveauTitre, description: nouvelleDesc } : e
    );
    setEtapes(next);
    saveEtapes(next);
  };


  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setEtapes(loadEtapes());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div className="accueil-background">
      <div className="accueil-wrapper">
        <div className="accueil-container">
          <h1>Accueil</h1>
          <div className="etapes-list">
            {etapes.length === 0 && (
              <div className="vide">Aucune étape pour le moment.</div>
            )}
            {etapes.map((etape, index) => (
              <div key={etape.id} className="etape-card">
                <h3>{etape.titre}</h3>
                <p>{etape.description}</p>
                <div className="icons">
                  <button
                    className="edit-btn"
                    title="Modifier"
                    onClick={() => handleEdit(etape.id)}
                  >
                    ✏️
                  </button>

                  <button
                    className="delete-btn"
                    title="Supprimer"
                    onClick={() => handleDelete(etape.id)}
                    aria-label="Supprimer"
                  >
                    {}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="red"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6L18.5 19A2 2 0 0 1 16.5 21H7.5A2 2 0 0 1 5.5 19L5 6" />
                      <path d="M10 11V17" />
                      <path d="M14 11V17" />
                      <path d="M9 6V4A1 1 0 0 1 10 3H14A1 1 0 0 1 15 4V6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="add-btn">
            <Link to="/formulaire" className="add-link">
              ＋
            </Link>
          </div>

          <div style={{ marginTop: 16 }}>
            <button
              onClick={() => {
                
                navigate("/checklist");
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "#444",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Voir la checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accueil;

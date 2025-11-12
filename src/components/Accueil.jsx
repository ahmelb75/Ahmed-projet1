import React from "react";
import "./Accueil.css";
import { Link } from "react-router-dom";

const Accueil = ({ 
  etapes = [], 
  onDelete, 
  onEdit, 
  onNavigateToChecklist,
  isLoading = false 
}) => {
  return (
    <div className="accueil-background">
      <div className="accueil-wrapper">
        <div className="accueil-container">
          <h1>Accueil</h1>
          <p className="subtitle">🕒 Créé depuis 3 jours</p>

          {isLoading ? (
            <div className="vide">Chargement...</div>
          ) : (
            <div className="etapes-list">
              {etapes.length === 0 && (
                <div className="vide">Aucune étape pour le moment.</div>
              )}
              {etapes.map((etape) => (
                <div key={etape.id} className="etape-card">
                  <h3>{etape.title}</h3>
                  <p>{etape.description}</p>
                  <div className="icons">
                    <button
                      className="edit-btn"
                      title="Modifier"
                      onClick={() => onEdit(etape.id)}
                    >
                      ✏️
                    </button>

                    <button
                      className="delete-btn"
                      title="Supprimer"
                      onClick={() => onDelete(etape.id)}
                      aria-label="Supprimer"
                    >
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
          )}

          <div className="add-btn">
            <Link to="/formulaire" className="add-link">
              ＋
            </Link>
          </div>

          <div style={{ marginTop: 16 }}>
            <button
              onClick={onNavigateToChecklist}
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
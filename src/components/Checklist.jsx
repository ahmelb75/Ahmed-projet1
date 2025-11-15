import React from "react";
import "./Checklist.css";
import { Link } from "react-router-dom";

const Checklist = ({ 
  taches = [], 
  onToggleTache, 
  onDeleteAll,
  isLoading = false 
}) => {
  return (
    <div className="checklist-background">
      <div className="checklist-container">
        <h2>Checklist</h2>
        <p className="subtitle">📋 Suivi des tâches du projet</p>

        {isLoading ? (
          <div className="vide">Chargement...</div>
        ) : (
          <ul className="taches-list">
            {taches.length === 0 && <div className="vide">Aucune tâche.</div>}

            {taches.map((tache) => {
              const estFaite = tache.statut === 2;

              return (
                <li
                  key={tache.id}
                  className={`tache-item ${estFaite ? "faite" : ""}`}
                  onClick={() => onToggleTache(tache.id, !estFaite)}
                >
                  <input
                    type="checkbox"
                    checked={estFaite}
                    onChange={() => onToggleTache(tache.id, !estFaite)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span>{tache.titre || tache.title || "Sans titre"}</span>
                </li>
              );
            })}
          </ul>
        )}

        {taches.length > 0 && (
          <button
            className="delete-all-btn"
            onClick={onDeleteAll}
            disabled={isLoading}
          >
            🗑️ Supprimer toutes les tâches
          </button>
        )}

        <Link to="/" className="retour-link">
          ⬅ Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default Checklist;

import React, { useEffect, useState } from "react";
import "./Checklist.css";
import { Link } from "react-router-dom";

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

const Checklist = () => {
  const [taches, setTaches] = useState([]);

  useEffect(() => {
    setTaches(loadEtapes().map((e) => ({ ...e })));
  }, []);

  const toggleTache = (id) => {
    const next = taches.map((t) =>
      t.id === id ? { ...t, faite: !t.faite } : t
    );
    setTaches(next);
    saveEtapes(next);
    localStorage.setItem("etapes_projet_last_update", Date.now().toString());
  };

  const supprimerToutesLesTaches = () => {
    if (window.confirm("Voulez-vous vraiment supprimer toutes les tâches ?")) {
      localStorage.removeItem(STORAGE_KEY);
      setTaches([]);
      localStorage.setItem("etapes_projet_last_update", Date.now().toString());
    }
  };

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY || e.key === "etapes_projet_last_update") {
        setTaches(loadEtapes());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div className="checklist-background">
      <div className="checklist-container">
        <h2>Checklist</h2>
        <p className="subtitle">📋 Suivi des tâches du projet</p>

        <ul className="taches-list">
          {taches.length === 0 && <div className="vide">Aucune tâche.</div>}
          {taches.map((tache) => (
            <li
              key={tache.id}
              className={`tache-item ${tache.faite ? "faite" : ""}`}
              onClick={() => toggleTache(tache.id)}
            >
              <input
                type="checkbox"
                checked={!!tache.faite}
                onChange={() => toggleTache(tache.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <span>{tache.titre}</span>
            </li>
          ))}
        </ul>

        {taches.length > 0 && (
          <button
            className="delete-all-btn"
            onClick={supprimerToutesLesTaches}
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
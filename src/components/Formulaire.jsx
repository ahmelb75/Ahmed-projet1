import React, { useState } from "react";
import "./Formulaire.css";
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

const Formulaire = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titre.trim() || !description.trim()) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const nouvelleEtape = {
      id: Date.now(), // id simple et unique
      titre: titre.trim(),
      description: description.trim(),
      // optional: état pour checklist
      faite: false,
    };

    const current = loadEtapes();
    const next = [...current, nouvelleEtape];
    saveEtapes(next);

    // reset
    setTitre("");
    setDescription("");

    // redirige vers l'accueil et force refresh de l'état
    navigate("/");
    // trigger storage event pour autres onglets (pas nécessaire localement), on lève un item temporaire
    localStorage.setItem("etapes_projet_last_update", Date.now().toString());
  };

  return (
    <div className="formulaire-background">
      <div className="formulaire-container">
        <h2>Formulaire</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="titre">Titre</label>
          <input
            id="titre"
            type="text"
            placeholder="Saisissez le titre de l'étape"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Ajoutez une description détaillée de l'étape"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">💾 Sauvegarder</button>
        </form>

        <Link to="/" className="retour-link">
          ⬅ Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default Formulaire;
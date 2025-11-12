import React from "react";
import "./Formulaire.css";
import { Link } from "react-router-dom";

const Formulaire = ({ 
  titre,
  description,
  onTitreChange,
  onDescriptionChange,
  onSubmit,
  isLoading = false 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="formulaire-background">
      <div className="formulaire-container">
        <h2>Nouvelle checklist</h2>
        <p className="subtitle">
          📝 Créez une nouvelle checklist à suivre
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="titre">Titre</label>
          <input
            id="titre"
            type="text"
            placeholder="Saisissez le titre de la checklist"
            value={titre}
            onChange={(e) => onTitreChange(e.target.value)}
            disabled={isLoading}
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Ajoutez une description détaillée de la checklist"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            disabled={isLoading}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "⏳ Création en cours..." : "💾 Créer la checklist"}
          </button>
        </form>

        <Link to="/" className="retour-link">
          ⬅ Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default Formulaire;

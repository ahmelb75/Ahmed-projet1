import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Formulaire from "../components/Formulaire";
import { checklistAPI } from "../services/api";

const FormulaireView = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!titre.trim()) {
      alert("⚠️ Le titre est obligatoire !");
      return;
    }

    setIsLoading(true);

    try {
      const newChecklist = {
        title: titre,
        description: description,
        todo: [] 
      };

      const response = await checklistAPI.create(newChecklist);

      console.log("Réponse API :", response);

if (response && response.id) {
  alert("✅ Checklist créée avec succès !");
  navigate("/");
} else {
  console.warn("Réponse inattendue :", response);
  alert("⚠️ Une erreur est survenue lors de la création.");
}

    } catch (error) {
      console.error("❌ Erreur lors de la création de la checklist :", error.response?.data || error.message);
      alert("🚫 Impossible de créer la checklist. Vérifie ta connexion ou ton token.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formulaire
      titre={titre}
      description={description}
      onTitreChange={setTitre}
      onDescriptionChange={setDescription}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default FormulaireView;

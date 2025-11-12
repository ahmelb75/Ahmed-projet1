import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Accueil from "../components/Accueil";
import { checklistAPI } from "../services/api";

const AccueilView = () => {
  const navigate = useNavigate();
  const [etapes, setEtapes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEtapes();
  }, []);


  const loadEtapes = async () => {
    setIsLoading(true);
    try {
      const data = await checklistAPI.getAll();

      if (data && Array.isArray(data.response)) {
        setEtapes(data.response);
      } else if (data && Array.isArray(data.result)) {
        setEtapes(data.result);
      } else {
        setEtapes([]);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des checklists:", error);
      alert("Impossible de charger les checklists. Vérifie ta connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette checklist ?")) return;

    try {
      await checklistAPI.delete(id);
      await loadEtapes();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Impossible de supprimer la checklist.");
    }
  };

  const handleEdit = async (id) => {
    const etape = etapes.find((e) => e.id === id);
    if (!etape) return;

    const nouveauTitre = window.prompt("Modifier le titre :", etape.title);
    if (nouveauTitre === null) return;

    const nouvelleDesc = window.prompt("Modifier la description :", etape.description);
    if (nouvelleDesc === null) return;

    try {
      const payload = {
        id: etape.id,
        title: nouveauTitre,
        description: nouvelleDesc,
        todo: etape.todo || [], 
      };

      console.log("📦 Payload envoyé à /checklist/update :", JSON.stringify(payload, null, 2));

      const response = await checklistAPI.update(payload);

      console.log("🟢 Réponse API :", response);

      if (response.done) {
        alert("✅ Checklist mise à jour avec succès !");
        await loadEtapes();
      } else {
        alert("❌ Erreur : la mise à jour a échoué.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("⚠️ Erreur : impossible de modifier la checklist.");
    }
  };

  const handleNavigateToChecklist = () => {
    navigate("/checklist");
  };

  return (
    <Accueil
      etapes={etapes}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onNavigateToChecklist={handleNavigateToChecklist}
      isLoading={isLoading}
    />
  );
};

export default AccueilView;

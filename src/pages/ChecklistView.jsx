import React, { useEffect, useState } from "react";
import Checklist from "../components/Checklist";
import { checklistAPI } from "../services/api";

const ChecklistView = () => {
  const [taches, setTaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTaches();
  }, []);

  const loadTaches = async () => {
    setIsLoading(true);
    try {
      const data = await checklistAPI.getAll();
      console.log("📋 Données reçues :", data);

      const rawTaches = data.response || data.result || [];
      const normalisees = rawTaches.map((t) => ({
        ...t,
        faite: t.statut === 2, 
      }));

      setTaches(normalisees);
    } catch (error) {
      console.error("Erreur lors du chargement des tâches:", error);
      alert("Impossible de charger les tâches. Vérifie ta connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTache = async (id, faite) => {
    try {
      const nouveauStatut = faite ? 2 : 0; 
      const response = await checklistAPI.updateStatut(id, nouveauStatut);
      console.log("🌀 Mise à jour statut checklist", id, "→", nouveauStatut, response);

      if (response.done) {
        setTaches((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, faite, statut: nouveauStatut } : t
          )
        );
      } else {
        alert("Impossible de modifier le statut de cette checklist.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error);
      alert("Impossible de mettre à jour la tâche.");
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Voulez-vous vraiment supprimer toutes les tâches ?")) return;
    try {
      await checklistAPI.deleteAll();
      setTaches([]);
    } catch (error) {
      console.error("Erreur lors de la suppression des tâches:", error);
      alert("Impossible de supprimer les tâches.");
    }
  };

  return (
    <Checklist
      taches={taches}
      onToggleTache={handleToggleTache}
      onDeleteAll={handleDeleteAll}
      isLoading={isLoading}
    />
  );
};

export default ChecklistView;

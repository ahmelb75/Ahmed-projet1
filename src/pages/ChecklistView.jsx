import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChecklists,
  updateChecklist,
  deleteChecklist
} from "../store/checklistSlice";

import Checklist from "../components/Checklist";
import toast from "react-hot-toast";

const ChecklistView = () => {
  const dispatch = useDispatch();
  const { etapes: taches, isLoading } = useSelector((state) => state.checklist);

  useEffect(() => {
    dispatch(fetchChecklists());
  }, []);

  const handleToggleTache = (id, faite) => {
    const tache = taches.find((t) => t.id === id);
    if (!tache) return;

    const nouveauStatut = faite ? 2 : 0;

    dispatch(updateChecklist({ ...tache, statut: nouveauStatut }));
    toast.success("Statut mis à jour !");
  };

  const handleDeleteAll = () => {
    toast((t) => (
      <span>
        Supprimer toutes les tâches ?
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              taches.forEach((t) => dispatch(deleteChecklist(t.id)));
              toast.dismiss(t.id);
              toast.success("Toutes les tâches ont été supprimées !");
            }}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Oui
          </button>

          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Annuler
          </button>
        </div>
      </span>
    ), {
      duration: 5000,
    });
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

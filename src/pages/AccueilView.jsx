import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChecklists,
  deleteChecklist,
  updateChecklist
} from "../store/checklistSlice";
import { useNavigate } from "react-router-dom";
import Accueil from "../components/Accueil";
import toast from "react-hot-toast";

const AccueilView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { etapes, isLoading } = useSelector((state) => state.checklist);

  useEffect(() => {
    dispatch(fetchChecklists());
  }, []);

  const handleDelete = (id) => {
    toast((t) => (
      <span>
        Supprimer cette checklist ?
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              dispatch(deleteChecklist(id));
              toast.dismiss(t.id);
              toast.success("Checklist supprimée !");
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

  const handleEdit = (id) => {
    const etape = etapes.find((e) => e.id === id);
    if (!etape) return;

    let newTitle = etape.title;
    let newDesc = etape.description;

    toast((t) => (
      <div className="flex flex-col gap-2">
        <p>Modifier la checklist :</p>

        <input
          defaultValue={etape.title}
          onChange={(e) => (newTitle = e.target.value)}
          className="border p-1 rounded"
        />

        <input
          defaultValue={etape.description}
          onChange={(e) => (newDesc = e.target.value)}
          className="border p-1 rounded"
        />

        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              dispatch(updateChecklist({ ...etape, title: newTitle, description: newDesc }));
              toast.dismiss(t.id);
              toast.success("Checklist mise à jour !");
            }}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Enregistrer
          </button>

          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Annuler
          </button>
        </div>
      </div>
    ), {
      duration: 8000,
    });
  };

  return (
    <Accueil
      etapes={etapes}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onNavigateToChecklist={() => navigate("/checklist")}
      isLoading={isLoading}
    />
  );
};

export default AccueilView;

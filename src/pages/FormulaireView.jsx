import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChecklist } from "../store/checklistSlice";
import { useNavigate } from "react-router-dom";
import Formulaire from "../components/Formulaire";
import toast from "react-hot-toast";

const FormulaireView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");

  const titreRef = useRef(null);

  const { isLoading } = useSelector((state) => state.checklist);

  const handleSubmit = async () => {
    if (!titre.trim()) {
      toast.error("⚠️ Le titre est obligatoire");
      titreRef.current?.focus();
      return;
    }

    const newChecklist = {
      title: titre,
      description,
      todo: [],
    };

    try {
      await dispatch(createChecklist(newChecklist)).unwrap();

      toast.success("Checklist créée 🎉");

      setTitre("");
      setDescription("");

      navigate("/");
    } catch (err) {
      toast.error("Erreur lors de la création ❌");
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
      titreRef={titreRef} 
    />
  );
};

export default FormulaireView;

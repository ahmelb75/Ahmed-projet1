import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccueilView from "./pages/AccueilView";
import FormulaireView from "./pages/FormulaireView";
import ChecklistView from "./pages/ChecklistView";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AccueilView />} />
        <Route path="/formulaire" element={<FormulaireView />} />
        <Route path="/checklist" element={<ChecklistView />} />
      </Routes>
    </Router>
  );
};

export default App;
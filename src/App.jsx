import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Accueil from "./components/Accueil";
import Formulaire from "./components/Formulaire";
import Checklist from "./components/Checklist";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/formulaire" element={<Formulaire />} />
        <Route path="/checklist" element={<Checklist />} />
      </Routes>
    </Router>
  );
};

export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Accueil from "./components/Accueil";
import Checklist from "./components/Checklist";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/checklist" element={<Checklist />} />
      </Routes>
    </Router>
  );
};

const token  = "441b78ff5253d34377ed32a5fecb4eb9473c9956";

export default App;

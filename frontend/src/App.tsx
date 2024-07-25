import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TutorialPage from "./pages/TutorialPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tutorial/:id" element={<TutorialPage />} />
      </Routes>
    </Router>
  );
};

export default App;

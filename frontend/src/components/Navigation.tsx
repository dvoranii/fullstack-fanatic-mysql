import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import TutorialsPage from "../pages/TutorialsPage/TutorialsPage";
import TutorialPage from "../pages/TutorialPage/TutorialPage";

const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tutorials" element={<TutorialsPage />} />
      <Route path="/tutorial/:id" element={<TutorialPage />} />
    </Routes>
  );
};

export default Navigation;

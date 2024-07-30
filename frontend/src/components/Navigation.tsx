import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import AboutPage from "../pages/AboutPage/AboutPage";
import TutorialsPage from "../pages/TutorialsPage/TutorialsPage";
import TutorialPage from "../pages/TutorialPage/TutorialPage";
import BlogsPage from "../pages/BlogsPage/BlogsPage";
import BlogDetail from "../components/BlogDetail/BlogDetail";
import ContactPage from "../pages/ContactPage/ContactPage";
import SignInRegisterPage from "../pages/SignInRegisterPage/SignInRegisterPage";

const Navigation: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/tutorials" element={<TutorialsPage />} />
      <Route path="/tutorial/:id" element={<TutorialPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/sign-in-register" element={<SignInRegisterPage />} />
    </Routes>
  );
};

export default Navigation;

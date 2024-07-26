import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Navigation />
    </Router>
  );
};

export default App;

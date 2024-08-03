import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserContext";

const clientId = import.meta.env.VITE_CLIENT_ID;

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <UserProvider>
        <Router>
          <NavBar />
          <Navigation />
        </Router>
      </UserProvider>
    </GoogleOAuthProvider>
  );
};

export default App;

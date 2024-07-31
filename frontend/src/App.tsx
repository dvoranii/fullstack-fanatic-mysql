import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId="544818258395-srj7e103j20gb3n1qb23bucglcccq2lr.apps.googleusercontent.com">
      {/* <AuthProvider> */}
      <Router>
        <NavBar />
        <Navigation />
      </Router>
      {/* </AuthProvider> */}
    </GoogleOAuthProvider>
  );
};

export default App;

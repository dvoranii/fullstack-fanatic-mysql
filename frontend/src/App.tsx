import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation";
import NavBar from "./components/NavBar/NavBar";
import { GlobalStyles } from "./GlobalStyles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserContext";
import Footer from "./components/Footer/Footer";

const clientId = import.meta.env.VITE_CLIENT_ID;

const App: React.FC = () => {
  return (
    <>
      <HelmetProvider>
        <GlobalStyles />
        <GoogleOAuthProvider clientId={clientId}>
          <UserProvider>
            <Router>
              <NavBar />
              <Navigation />
              <Footer />
            </Router>
          </UserProvider>
        </GoogleOAuthProvider>
      </HelmetProvider>
    </>
  );
};

export default App;

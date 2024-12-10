import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserContext";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

// Lazy load components
const NavBar = React.lazy(() => import("./components/NavBar/NavBar"));
const Navigation = React.lazy(() => import("./components/Navigation"));
const Footer = React.lazy(() => import("./components/Footer/Footer"));

const clientId = import.meta.env.VITE_CLIENT_ID;

const App: React.FC = () => {
  return (
    <>
      <HelmetProvider>
        <GlobalStyles />
        <GoogleOAuthProvider clientId={clientId}>
          <UserProvider>
            <Router>
              <Suspense fallback={<LoadingSpinner />}>
                <NavBar />
                <Navigation />
                <Footer />
              </Suspense>
            </Router>
          </UserProvider>
        </GoogleOAuthProvider>
      </HelmetProvider>
    </>
  );
};

export default App;

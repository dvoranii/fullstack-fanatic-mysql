import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserContext";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { useInactivityTimer } from "./hooks/useInactivityTimer";

// Lazy load components
const NavBar = React.lazy(() => import("./components/NavBar/NavBar"));
const Navigation = React.lazy(() => import("./components/Navigation"));
const Footer = React.lazy(() => import("./components/Footer/Footer"));
const ScrollToTop = React.lazy(
  () => import("./components/ScrollToTop/ScrollToTop")
);

const clientId = import.meta.env.VITE_CLIENT_ID;

// Child Component to Invoke the Hook
const InactivityHandler: React.FC = () => {
  useInactivityTimer(); // Hook runs inside Router context
  return null; // Render nothing, just runs the effect
};

const App: React.FC = () => {
  return (
    <>
      <HelmetProvider>
        <GlobalStyles />
        <GoogleOAuthProvider clientId={clientId}>
          <UserProvider>
            <Router>
              <InactivityHandler />
              <Suspense fallback={<LoadingSpinner />}>
                <ScrollToTop />
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

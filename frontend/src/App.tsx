import React, { Suspense } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyles } from "./GlobalStyles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./context/UserContext";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { useInactivityTimer } from "./hooks/useInactivityTimer";

const NavBar = React.lazy(() => import("./components/NavBar/NavBar"));
const Navigation = React.lazy(() => import("./components/Navigation"));
const Footer = React.lazy(() => import("./components/Footer/Footer"));
const ScrollToTop = React.lazy(
  () => import("./components/ScrollToTop/ScrollToTop")
);

const clientId = import.meta.env.VITE_CLIENT_ID;

const InactivityHandler: React.FC = () => {
  useInactivityTimer();
  return null;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>Full Stack Fanatic</title>
      </Helmet>
      <GlobalStyles />
      <GoogleOAuthProvider clientId={clientId}>
        <UserProvider>
          <Router>
            <InactivityHandler />
            <Suspense fallback={<LoadingSpinner />}>
              <ScrollToTop />
              <NavBar />
              <Navigation />
              <Footer/>

              {/* <LazySection
                importFunc={() => import("./components/Footer/Footer")}
                fallback={<LoadingSpinner />}
                rootMargin="0px"
                threshold={0}
                componentProps={{}}
              /> */}
            </Suspense>
          </Router>
        </UserProvider>
      </GoogleOAuthProvider>
    </HelmetProvider>
  );
};

export default App;

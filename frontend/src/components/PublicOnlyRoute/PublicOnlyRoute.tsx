import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface PublicOnlyRouteProps {
  element: JSX.Element;
}

const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ element }) => {
  const { profile, loading } = useContext(UserContext) || {};

  if (loading) {
    return <LoadingSpinner />;
  }

  if (profile) {
    return <Navigate to="/my-account" replace />;
  }

  return element;
};

export default PublicOnlyRoute;

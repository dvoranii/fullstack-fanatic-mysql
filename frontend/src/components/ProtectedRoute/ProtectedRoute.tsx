import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { tutorialContent } from "../../assets/tutorialContent";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const getTutorialPremiumLevel = (id: string | undefined) => {
  const tutorial = tutorialContent.find(
    (tutorial) => tutorial.id === Number(id)
  );
  return tutorial?.premiumLevel || null;
};

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { profile, loading } = useContext(UserContext) || {};
  const { id } = useParams();

  if (loading) {
    return <LoadingSpinner />;
  }

  const requiredLevel = getTutorialPremiumLevel(id);

  if (!requiredLevel) return element;

  const levels = ["starter", "casual pro", "premium"];
  const userIndex = levels.indexOf(profile?.premiumLevel || "");
  const requiredIndex = levels.indexOf(requiredLevel);

  if (userIndex === -1 || userIndex < requiredIndex) {
    return <Navigate to="/plans-and-pricing" replace />;
  }

  return element;
};

export default ProtectedRoute;

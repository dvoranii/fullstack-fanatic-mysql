import { useContext } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { tutorialContent } from "../../assets/tutorialContent";
import { blogContent } from "../../assets/blogContent";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const getTutorialPremiumLevel = (id: string | undefined) => {
  const tutorial = tutorialContent.find(
    (tutorial) => tutorial.id === Number(id)
  );
  return tutorial?.premiumLevel || null;
};

const isBlogPremium = (id: string | undefined) => {
  const blog = blogContent.find((blog) => blog.id === Number(id));
  return blog?.isPremium || false;
};

interface ProtectedRouteProps {
  element: JSX.Element;
  purchasedTutorialIds?: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  purchasedTutorialIds,
}) => {
  const { profile, loading } = useContext(UserContext) || {};
  const { id } = useParams();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  const isTutorialRoute = location.pathname.includes("/tutorial/");
  const isBlogRoute = location.pathname.includes("/blog/");

  if (isTutorialRoute) {
    const tutorialId = Number(id);
    const requiredLevel = getTutorialPremiumLevel(id);

    if (purchasedTutorialIds?.includes(tutorialId)) {
      return element;
    }

    if (!requiredLevel) return element;

    const levels = ["starter", "casual pro", "premium"];
    const userIndex = levels.indexOf(profile?.premiumLevel || "");
    const requiredIndex = levels.indexOf(requiredLevel);

    if (userIndex === -1 || userIndex < requiredIndex) {
      return <Navigate to="/plans-and-pricing" replace />;
    }

    return element;
  } else if (isBlogRoute) {
    const isPremium = isBlogPremium(id);

    if (isPremium && !profile) {
      return <Navigate to="/plans-and-pricing" replace />;
    }

    return element;
  }

  return element;
};

export default ProtectedRoute;

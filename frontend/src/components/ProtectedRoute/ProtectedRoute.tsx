import { useContext, Suspense, ComponentType } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { tutorialContent } from "../../assets/tutorialContent";
import { blogContent } from "../../assets/blogContent";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const getTutorialAccessLevel = (id: string | undefined) => {
  const tutorial = tutorialContent.find(
    (tutorial) => tutorial.id === Number(id)
  );
  return tutorial?.accessLevel || null;
};

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
  component: ComponentType<any>;
  props?: Record<string, any>;
  purchasedItemIds?: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  props = {},
  purchasedItemIds,
}) => {
  const { profile, loading } = useContext(UserContext) || {};
  const { id } = useParams();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  const isTutorialRoute = location.pathname.includes("/tutorial/");
  const isBlogRoute = location.pathname.includes("/blog/");
  const isMyAccountRoute = location.pathname.startsWith("/my-account");

  if (!profile && isMyAccountRoute) {
    return <Navigate to="/login" replace />;
  }

  if (isTutorialRoute) {
    const tutorialId = Number(id);
    const accessLevel = getTutorialAccessLevel(id);

    if (accessLevel === "free") {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <Component {...props} />
        </Suspense>
      );
    }

    if (!profile) {
      return <Navigate to="/register" replace />;
    }

    const purchasedTutorial = purchasedItemIds?.includes(tutorialId);

    if (purchasedTutorial) {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <Component {...props} />
        </Suspense>
      );
    }

    const requiredLevel = getTutorialPremiumLevel(id);

    if (!requiredLevel) {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <Component {...props} />
        </Suspense>
      );
    }

    const levels = ["starter", "casual pro", "premium"];
    const userIndex = levels.indexOf(profile?.premiumLevel || "");
    const requiredIndex = levels.indexOf(requiredLevel);

    if (userIndex === -1 || userIndex < requiredIndex) {
      return <Navigate to="/plans-and-pricing" replace />;
    }

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Component {...props} />
      </Suspense>
    );
  } else if (isBlogRoute) {
    const blogId = Number(id);
    const isPremium = isBlogPremium(id);

    if (!profile && !isPremium) {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <Component {...props} />
        </Suspense>
      );
    }

    if (purchasedItemIds?.includes(blogId) || !isPremium) {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <Component {...props} />
        </Suspense>
      );
    }

    if (!profile) {
      return <Navigate to="/register" replace />;
    }

    if (
      isPremium &&
      !purchasedItemIds?.includes(blogId) &&
      !profile?.isPremium
    ) {
      return <Navigate to="/plans-and-pricing" replace />;
    }

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Component {...props} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component
        {...props}
        purchasedItemIds={purchasedItemIds}
        userId={id ? Number(id) : profile?.id}
      />
    </Suspense>
  );
};

export default ProtectedRoute;

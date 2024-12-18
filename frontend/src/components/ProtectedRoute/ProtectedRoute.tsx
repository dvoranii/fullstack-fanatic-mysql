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
  component: ComponentType<Record<string, unknown>>;
  props?: Record<string, unknown>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  props = {},
}) => {
  const { profile, loading, purchasedItems } = useContext(UserContext) || {};
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

  if (location.pathname === "/my-subscription-cart") {
    if (!profile) {
      return <Navigate to="/register" replace />;
    }

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Component {...props} />
      </Suspense>
    );
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

    const purchasedTutorial = purchasedItems?.some(
      (item) =>
        item.product_id === tutorialId && item.product_type === "tutorial"
    );

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

    const purchasedBlog = purchasedItems?.some(
      (item) => item.product_id === blogId && item.product_type === "blog"
    );

    if (purchasedBlog || !isPremium) {
      return (
        <Suspense fallback={<LoadingSpinner />}>
          <Component {...props} />
        </Suspense>
      );
    }

    if (!profile) {
      return <Navigate to="/register" replace />;
    }

    if (isPremium && !purchasedBlog && !profile?.isPremium) {
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
      <Component {...props} userId={id ? Number(id) : profile?.id} />
    </Suspense>
  );
};

export default ProtectedRoute;

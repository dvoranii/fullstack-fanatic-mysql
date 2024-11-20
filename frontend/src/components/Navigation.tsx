import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";

const HomePage = lazy(() => import("../pages/Home/HomePage"));
const AboutPage = lazy(() => import("../pages/About/AboutPage"));
const TutorialsPage = lazy(() => import("../pages/Tutorials/TutorialsPage"));
const TutorialPage = lazy(() => import("../pages/Tutorial/TutorialPage"));
const BlogsPage = lazy(() => import("../pages/Blogs/BlogsPage"));
const BlogDetail = lazy(() => import("../components/BlogDetail/BlogDetail"));
const ContactPage = lazy(() => import("../pages/Contact/ContactPage"));
const SignInRegisterPage = lazy(
  () => import("../pages/SignInRegister/SignInRegisterPage")
);
const UserAccountPage = lazy(
  () => import("../pages/UserProfileLayout/UserAccountPage/UserAccountPage")
);
const PublicUserPage = lazy(
  () => import("../pages/UserProfileLayout/PublicUserPage/PublicUserPage")
);
const MessageInboxPage = lazy(
  () =>
    import("../pages/UserProfileLayout/MessageInboxLayout/MessageInboxLayout")
);
import NetworkPage from "../pages/Network/Network";
import FollowersList from "../pages/UserProfileLayout/FollowList/FollowersList/FollowersList";
import FollowingList from "../pages/UserProfileLayout/FollowList/FollowingList/FollowingList";
import CommentHistory from "../pages/UserProfileLayout/CommentHistory/CommentHistory";
import ViewCartPage from "../pages/Checkout/ViewCart/ViewCart";
import CheckoutSuccess from "../pages/Checkout/Success/Success";
import CheckoutCancel from "../pages/Checkout/Cancel/Cancel";
import PlansAndPricing from "../pages/PlansAndPricing/PlansAndPricing";
import SubscriptionCart from "../pages/Checkout/SubscriptionCart/SubscriptionCart";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Settings from "../pages/Settings/Settings";

import { fetchPurchasedItems } from "../services/purchasesService";

const Navigation: React.FC = () => {
  const { profile } = useContext(UserContext) || {};
  const [purchasedItemIds, setPurchasedItemIds] = useState<number[]>([]);

  useEffect(() => {
    const loadPurchasedItems = async () => {
      if (profile?.id) {
        try {
          const purchases = await fetchPurchasedItems(profile.id);
          setPurchasedItemIds(purchases.map((p) => p.product_id));
        } catch (error) {
          console.error("Error fetching purchases:", error);
        }
      }
    };

    loadPurchasedItems();
  }, [profile?.id]);

  return (
    <Suspense fallback={<LoadingOverlay />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route
          path="/tutorial/:id"
          element={
            <ProtectedRoute
              element={<TutorialPage />}
              purchasedItemIds={purchasedItemIds}
            />
          }
        />
        <Route
          path="/tutorial/:id/comments/:commentId"
          element={<TutorialPage />}
        />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute
              element={<BlogDetail />}
              purchasedItemIds={purchasedItemIds}
            />
          }
        />
        <Route path="/blog/:id/comments/:commentId" element={<BlogDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/register"
          element={<SignInRegisterPage defaultToLogin={false} />}
        />
        <Route
          path="/login"
          element={<SignInRegisterPage defaultToLogin={true} />}
        />
        <Route
          path="/my-account"
          element={<ProtectedRoute element={<UserAccountPage />} />}
        />

        <Route
          path="/my-account/inbox"
          element={<ProtectedRoute element={<MessageInboxPage />} />}
        />
        <Route path="/user/:id" element={<PublicUserPage />} />
        <Route
          path="/my-account/followers"
          element={
            <ProtectedRoute
              element={<FollowersList userId={Number(profile?.id)} />}
            />
          }
        />
        <Route
          path="/my-account/following"
          element={
            <ProtectedRoute
              element={<FollowingList userId={Number(profile?.id)} />}
            />
          }
        />

        <Route path="/user/:id/followers" element={<FollowersList />} />
        <Route path="/user/:id/following" element={<FollowingList />} />
        <Route
          path="/my-account/comment-history"
          element={<ProtectedRoute element={<CommentHistory />} />}
        />

        <Route path="/user/:id/comment-history" element={<CommentHistory />} />
        <Route path="/my-cart" element={<ViewCartPage />} />
        <Route path="/my-subscription-cart" element={<SubscriptionCart />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        <Route path="/plans-and-pricing" element={<PlansAndPricing />} />
        <Route path="network" element={<NetworkPage />} />
        <Route
          path="/my-account/settings"
          element={<ProtectedRoute element={<Settings />} />}
        />
      </Routes>
    </Suspense>
  );
};

export default Navigation;

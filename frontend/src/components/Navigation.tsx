import { Suspense, lazy, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
// import ScrollToTop from "./ScrollToTop/ScrollToTop";

const HomePage = lazy(() => import("../pages/Home/HomePage"));
const preloadHomePage = () => import("../pages/Home/HomePage");
preloadHomePage();

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
const FollowersList = lazy(
  () =>
    import("../pages/UserProfileLayout/FollowList/FollowersList/FollowersList")
);
const FollowingList = lazy(
  () =>
    import("../pages/UserProfileLayout/FollowList/FollowingList/FollowingList")
);

const PublicUserPage = lazy(
  () => import("../pages/UserProfileLayout/PublicUserPage/PublicUserPage")
);
const MessageInboxLayout = lazy(
  () =>
    import("../pages/UserProfileLayout/MessageInboxLayout/MessageInboxLayout")
);

const NetworkPage = lazy(() => import("../pages/Network/Network"));
const CommentHistory = lazy(
  () => import("../pages/UserProfileLayout/CommentHistory/CommentHistory")
);

const ViewCart = lazy(() => import("../pages/Checkout/ViewCart/ViewCart"));
const SubscriptionCart = lazy(
  () => import("../pages/Checkout/SubscriptionCart/SubscriptionCart")
);
const Settings = lazy(() => import("../pages/Settings/Settings"));
const PlansAndPricing = lazy(
  () => import("../pages/PlansAndPricing/PlansAndPricing")
);

const ProtectedRoute = lazy(
  () => import("../components/ProtectedRoute/ProtectedRoute")
);
const PublicOnlyRoute = lazy(() => import("./PublicOnlyRoute/PublicOnlyRoute"));

const CheckoutSuccess = lazy(() => import("../pages/Checkout/Success/Success"));
const CheckoutCancel = lazy(() => import("../pages/Checkout/Cancel/Cancel"));
const ForgotPassword = lazy(
  () => import("../pages/SignInRegister/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("../pages/SignInRegister/ResetPassword/ResetPassword")
);

import NotFound from "../pages/NotFound/NotFound";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";

import usePurchasedItems from "../hooks/usePurchasedItems";

const preloadMyAccountPage = () =>
  import("../pages/UserProfileLayout/UserAccountPage/UserAccountPage");

const Navigation: React.FC = () => {
  const { profile } = useContext(UserContext) || {};
  const purchasedItemIds = usePurchasedItems(profile?.id);

  useEffect(() => {
    if (profile?.id) {
      preloadMyAccountPage();
    }
  }, [profile]);

  return (
    <Suspense fallback={<LoadingOverlay />}>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route
          path="/tutorial/:id"
          element={
            <ProtectedRoute
              component={TutorialPage}
              props={{ purchasedItemIds: purchasedItemIds }}
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
              component={BlogDetail}
              props={{ purchasedItemIds: purchasedItemIds }}
            />
          }
        />
        <Route path="/blog/:id/comments/:commentId" element={<BlogDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute
              element={<SignInRegisterPage defaultToLogin={false} />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute
              element={<SignInRegisterPage defaultToLogin={true} />}
            />
          }
        />

        <Route
          path="/my-account"
          element={<ProtectedRoute component={UserAccountPage} />}
        />

        <Route
          path="/my-account/inbox"
          element={<ProtectedRoute component={MessageInboxLayout} />}
        />
        <Route path="/user/:id" element={<PublicUserPage />} />
        <Route
          path="/my-account/followers"
          element={<ProtectedRoute component={FollowersList} />}
        />
        <Route
          path="/my-account/following"
          element={<ProtectedRoute component={FollowingList} />}
        />

        <Route
          path="/user/:id/followers"
          element={
            <ProtectedRoute
              component={FollowersList}
              props={{ isPublicView: true }}
            />
          }
        />
        <Route
          path="/user/:id/following"
          element={
            <ProtectedRoute
              component={FollowingList}
              props={{ isPublicView: true }}
            />
          }
        />

        <Route
          path="/my-account/comment-history"
          element={<ProtectedRoute component={CommentHistory} />}
        />

        <Route path="/user/:id/comment-history" element={<CommentHistory />} />
        <Route
          path="/my-cart"
          element={<ProtectedRoute component={ViewCart} />}
        />
        <Route
          path="/my-subscription-cart"
          element={<ProtectedRoute component={SubscriptionCart} />}
        />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        <Route
          path="/plans-and-pricing"
          element={<ProtectedRoute component={PlansAndPricing} />}
        />
        <Route path="/network" element={<NetworkPage />} />
        <Route
          path="/forgot-password"
          element={<PublicOnlyRoute element={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password/:token"
          element={<PublicOnlyRoute element={<ResetPassword />} />}
        />
        <Route
          path="/my-account/settings"
          element={<ProtectedRoute component={Settings} />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </Suspense>
  );
};

export default Navigation;

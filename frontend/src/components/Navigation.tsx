import { Suspense, lazy, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../context/UserContext";

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
import FollowersList from "../pages/UserProfileLayout/FollowersList/FollowersList";
import FollowingList from "../pages/UserProfileLayout/FollowingList/FollowingList";

const Navigation: React.FC = () => {
  const { profile } = useContext(UserContext) || {};
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route path="/tutorial/:id" element={<TutorialPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/register"
          element={<SignInRegisterPage defaultToLogin={false} />}
        />
        <Route
          path="/login"
          element={<SignInRegisterPage defaultToLogin={true} />}
        />
        <Route path="/my-account" element={<UserAccountPage />} />
        <Route path="/my-account/inbox" element={<MessageInboxPage />} />
        <Route path="/user/:id" element={<PublicUserPage />} />
        <Route
          path="/my-account/followers"
          element={<FollowersList userId={Number(profile?.id)} />}
        />
        <Route
          path="/my-account/following"
          element={<FollowingList userId={Number(profile?.id)} />}
        />
      </Routes>
    </Suspense>
  );
};

export default Navigation;

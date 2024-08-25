import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const TutorialsPage = lazy(
  () => import("../pages/TutorialsPage/TutorialsPage")
);
const TutorialPage = lazy(() => import("../pages/TutorialPage/TutorialPage"));
const BlogsPage = lazy(() => import("../pages/BlogsPage/BlogsPage"));
const BlogDetail = lazy(() => import("../components/BlogDetail/BlogDetail"));
const ContactPage = lazy(() => import("../pages/ContactPage/ContactPage"));
const SignInRegisterPage = lazy(
  () => import("../pages/SignInRegisterPage/SignInRegisterPage")
);
const UserAccountPage = lazy(
  () => import("../pages/UserAccountPage/UserAccountPage")
);
const PublicUserPage = lazy(
  () => import("../pages/UserAccountPage/PublicUserPage")
);

const Navigation: React.FC = () => {
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
        <Route path="/sign-in-register" element={<SignInRegisterPage />} />
        <Route path="my-account" element={<UserAccountPage />} />
        <Route path="/user/:id" element={<PublicUserPage />} />
      </Routes>
    </Suspense>
  );
};

export default Navigation;

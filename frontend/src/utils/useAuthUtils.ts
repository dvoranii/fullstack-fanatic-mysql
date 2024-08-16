import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import useUser from "../hooks/useUser";

export const useAuthUtils = () => {
  const navigate = useNavigate();
  const { setProfile } = useUser();

  const logOut = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | null
  ) => {
    // Prevent default behavior if an event is passed (user-initiated logout)
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    googleLogout(); // Log out from Google
    setProfile(null); // Clear the user profile in the frontend
    localStorage.removeItem("accessToken"); // Remove the JWT token from localStorage
    navigate("/", { replace: true }); // Redirect to the home page
  };

  return {
    logOut,
  };
};

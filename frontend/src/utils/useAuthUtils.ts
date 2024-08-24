import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import useUser from "../hooks/useUser";

export const useAuthUtils = () => {
  const navigate = useNavigate();
  const { setProfile } = useUser();

  const logOut = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent> | null
  ) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    googleLogout();
    setProfile(null);
    localStorage.removeItem("accessToken");
    // localStorage.removeItem("userProfile");
    navigate("/", { replace: true });
  };

  return {
    logOut,
  };
};

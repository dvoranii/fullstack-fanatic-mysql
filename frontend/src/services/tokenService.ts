import { JwtPayload, jwtDecode } from "jwt-decode";
import { refreshJwt as apiRefreshJwt } from "../api/api";

const getAuthToken = () => localStorage.getItem("accessToken");

const setAuthToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

const refreshJwt = async () => {
  try {
    const token = await apiRefreshJwt();
    setAuthToken(token);
    return token;
  } catch (error) {
    console.error("Error refreshing JWT:", error);
    throw error;
  }
};

const isTokenExpired = (token: string) => {
  const decoded: JwtPayload = jwtDecode<JwtPayload>(token);

  if (!decoded.exp) {
    return true;
  }
  return decoded.exp * 1000 < Date.now();
};

const handleTokenExpiration = async () => {
  let token = getAuthToken();

  if (!token) {
    return null;
  }

  if (isTokenExpired(token)) {
    try {
      token = await refreshJwt();
    } catch (error) {
      console.error("Failed to refresh JWT:", error);
      return null;
    }
  }
  return token;
};

export { getAuthToken, setAuthToken, handleTokenExpiration };
